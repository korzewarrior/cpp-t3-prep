document.addEventListener('DOMContentLoaded', function() {
    const contentArea = document.getElementById('markdown-content');
    const navLinks = document.querySelectorAll('.topics-list a');
    
    // Configure marked to use highlight.js for code blocks
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(lang, code).value;
            }
            return hljs.highlightAuto(code).value;
        }
    });
    
    // Default to showing the overview on page load
    loadMarkdownContent('TestIII_Topics_Overview.md');
    
    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the file to load from data attribute
            const fileToLoad = this.getAttribute('data-file');
            
            // Load the markdown content
            loadMarkdownContent(fileToLoad);
            
            // Update URL with hash for bookmarking
            window.location.hash = fileToLoad;
        });
    });
    
    // Check for hash in URL on page load to navigate directly to a topic
    if (window.location.hash) {
        const fileFromHash = window.location.hash.substring(1);
        
        // Verify the file exists in our navigation
        const matchingLink = Array.from(navLinks).find(link => 
            link.getAttribute('data-file') === fileFromHash
        );
        
        if (matchingLink) {
            // Simulate a click on the matching link
            matchingLink.click();
        }
    } else {
        // Mark the overview link as active by default
        const overviewLink = document.querySelector('.topics-list a[data-file="TestIII_Topics_Overview.md"]');
        overviewLink.classList.add('active');
    }
    
    // Function to load markdown content
    function loadMarkdownContent(fileName) {
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdownText => {
                // Convert markdown to HTML
                const htmlContent = marked.parse(markdownText);
                
                // Set the content
                contentArea.innerHTML = htmlContent;
                
                // Apply syntax highlighting to code blocks
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
                
                // Scroll to top
                window.scrollTo(0, 0);
            })
            .catch(error => {
                contentArea.innerHTML = `<div class="error">
                    <h2>Error Loading Content</h2>
                    <p>Failed to load the requested file: ${fileName}</p>
                    <p>Error details: ${error.message}</p>
                </div>`;
            });
    }
}); 