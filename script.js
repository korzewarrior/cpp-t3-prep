document.addEventListener('DOMContentLoaded', function() {
    const contentArea = document.getElementById('markdown-content');
    const navLinks = document.querySelectorAll('.topics-list a');
    const prevButton = document.getElementById('prev-topic');
    const nextButton = document.getElementById('next-topic');
    
    // Array of topic files in order for navigation
    const orderedTopics = [
        "TestIII_Topics_Overview.md",
        "1_OOP_Basics.md",
        "2_CPP_IO.md",
        "3_Inheritance_Polymorphism.md",
        "4_MultiFile_Classes.md",
        "5_Templates_STL.md",
        "6_Smart_Pointers.md",
        "7_Algorithms_BFS_MinHeap.md",
        "8_Operator_Overloading.md",
        "CPP_Study_Guide.md",
        "CPP_Test3_Cheatsheet.md"
    ];
    
    let currentTopicIndex = 0;
    
    // Configure marked to use highlight.js for code blocks
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (e) {
                    console.error(e);
                    return hljs.highlightAuto(code).value;
                }
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true
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
            
            // Update navigation buttons
            currentTopicIndex = orderedTopics.indexOf(fileToLoad);
            updateNavigationButtons();
            
            // Update URL with hash for bookmarking
            window.location.hash = fileToLoad;
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Previous topic button click handler
    prevButton.addEventListener('click', function() {
        if (currentTopicIndex > 0) {
            currentTopicIndex--;
            const prevFile = orderedTopics[currentTopicIndex];
            const prevLink = document.querySelector(`.topics-list a[data-file="${prevFile}"]`);
            prevLink.click();
        }
    });
    
    // Next topic button click handler
    nextButton.addEventListener('click', function() {
        if (currentTopicIndex < orderedTopics.length - 1) {
            currentTopicIndex++;
            const nextFile = orderedTopics[currentTopicIndex];
            const nextLink = document.querySelector(`.topics-list a[data-file="${nextFile}"]`);
            nextLink.click();
        }
    });
    
    // Update the navigation buttons based on current topic
    function updateNavigationButtons() {
        prevButton.disabled = currentTopicIndex === 0;
        nextButton.disabled = currentTopicIndex === orderedTopics.length - 1;
    }
    
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
        } else {
            // If hash not found, mark the overview link as active by default
            const overviewLink = document.querySelector('.topics-list a[data-file="TestIII_Topics_Overview.md"]');
            overviewLink.classList.add('active');
            currentTopicIndex = 0;
            updateNavigationButtons();
        }
    } else {
        // Mark the overview link as active by default
        const overviewLink = document.querySelector('.topics-list a[data-file="TestIII_Topics_Overview.md"]');
        overviewLink.classList.add('active');
        currentTopicIndex = 0;
        updateNavigationButtons();
    }
    
    // Function to load markdown content
    function loadMarkdownContent(fileName) {
        // Show loading indicator
        contentArea.innerHTML = '<div class="loading">Loading content...</div>';
        
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
                
                // Add target="_blank" to external links
                document.querySelectorAll('#markdown-content a').forEach(link => {
                    if (link.hostname !== window.location.hostname) {
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                });
                
                // Add table styling
                document.querySelectorAll('#markdown-content table').forEach(table => {
                    table.classList.add('markdown-table');
                    
                    // Add wrapper for responsive tables
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-responsive';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                });
            })
            .catch(error => {
                contentArea.innerHTML = `<div class="error">
                    <h2>Error Loading Content</h2>
                    <p>Failed to load the requested file: ${fileName}</p>
                    <p>Error details: ${error.message}</p>
                </div>`;
            });
    }
    
    // Add CSS styles for tables and loading indicator
    const style = document.createElement('style');
    style.innerHTML = `
        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--gray);
        }
        
        .error {
            padding: 2rem;
            border-left: 4px solid var(--accent);
            background-color: rgba(231, 76, 60, 0.1);
            border-radius: 4px;
        }
        
        .error h2 {
            color: var(--accent);
            margin-top: 0 !important;
        }
        
        .table-responsive {
            overflow-x: auto;
            margin: 1.5rem 0;
        }
        
        .markdown-table {
            border-collapse: collapse;
            width: 100%;
            margin: 0;
        }
        
        .markdown-table th,
        .markdown-table td {
            padding: 0.75rem;
            border: 1px solid var(--border);
        }
        
        .markdown-table th {
            background-color: var(--light-gray);
            font-weight: 600;
            text-align: left;
        }
        
        .markdown-table tr:nth-child(even) {
            background-color: var(--light);
        }
    `;
    document.head.appendChild(style);
}); 