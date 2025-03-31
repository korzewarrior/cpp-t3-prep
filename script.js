document.addEventListener('DOMContentLoaded', function() {
    const contentArea = document.getElementById('markdown-content');
    const navLinks = document.querySelectorAll('.topics-list a');
    const prevButton = document.getElementById('prev-topic');
    const nextButton = document.getElementById('next-topic');
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTopicDisplay = document.getElementById('current-topic');
    const themeToggleButton = document.getElementById('theme-toggle');
    const leftArrow = document.querySelector('.keyboard-shortcuts span[title="Previous Topic"]');
    const rightArrow = document.querySelector('.keyboard-shortcuts span[title="Next Topic"]');
    
    // Make the sidebar arrow buttons functional
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            if (!prevButton.disabled) {
                prevButton.click();
            }
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            if (!nextButton.disabled) {
                nextButton.click();
            }
        });
    }
    
    // Theme toggle functionality
    function initThemeToggle() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            updateThemeColor('#1e272e'); // Update the theme-color meta tag for dark mode
        }
        
        // Toggle theme when button is clicked
        themeToggleButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save theme preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                updateThemeColor('#1e272e');
            } else {
                localStorage.setItem('theme', 'light');
                updateThemeColor('#34495e');
            }
        });
    }
    
    // Update theme-color meta tag for browser UI
    function updateThemeColor(color) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', color);
        }
    }
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Updated file names with cleaner naming convention
    const orderedTopics = [
        "Overview.md",
        "1-OOP.md",
        "2-IO.md",
        "3-Inheritance.md",
        "4-MultiFile.md",
        "5-Templates.md",
        "6-Pointers.md",
        "7-Algorithms.md",
        "8-Operators.md",
        "0-StudyGuide.md",
        "CheatSheet.md"
    ];
    
    // Map old file names to new file names for URL hash compatibility
    const fileNameMap = {
        "TestIII_Topics_Overview.md": "Overview.md",
        "1_OOP_Basics.md": "1-OOP.md",
        "2_CPP_IO.md": "2-IO.md",
        "3_Inheritance_Polymorphism.md": "3-Inheritance.md",
        "4_MultiFile_Classes.md": "4-MultiFile.md",
        "5_Templates_STL.md": "5-Templates.md",
        "6_Smart_Pointers.md": "6-Pointers.md",
        "7_Algorithms_BFS_MinHeap.md": "7-Algorithms.md",
        "8_Operator_Overloading.md": "8-Operators.md",
        "CPP_Study_Guide.md": "0-StudyGuide.md",
        "CPP_Test3_Cheatsheet.md": "CheatSheet.md"
    };
    
    let currentTopicIndex = 0;
    
    // Toggle sidebar on mobile
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-collapsed');
            if (sidebar.classList.contains('sidebar-collapsed')) {
                toggleButton.textContent = '≡';
            } else {
                toggleButton.textContent = '×';
            }
        });
    }
    
    // Initially collapse sidebar on mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.add('sidebar-collapsed');
    }
    
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
        breaks: true,
        gfm: true
    });
    
    // Default to showing the overview on page load
    loadMarkdownContent('Overview.md');
    
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
            updateProgressIndicator();
            
            // Collapse sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.add('sidebar-collapsed');
                if (toggleButton) toggleButton.textContent = '≡';
            }
            
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
    
    // Enable keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Left arrow key for previous topic
        if (e.key === 'ArrowLeft' && !prevButton.disabled) {
            prevButton.click();
        }
        // Right arrow key for next topic
        else if (e.key === 'ArrowRight' && !nextButton.disabled) {
            nextButton.click();
        }
        // 'D' key for dark mode toggle
        else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            themeToggleButton.click();
        }
    });
    
    // Update the navigation buttons based on current topic
    function updateNavigationButtons() {
        prevButton.disabled = currentTopicIndex === 0;
        nextButton.disabled = currentTopicIndex === orderedTopics.length - 1;
        
        // Update button text to include topic names
        if (!prevButton.disabled) {
            const prevIndex = currentTopicIndex - 1;
            const prevTopicName = document.querySelector(`.topics-list a[data-file="${orderedTopics[prevIndex]}"]`).textContent.trim();
            prevButton.innerHTML = `← ${prevTopicName}`;
        } else {
            prevButton.textContent = 'Previous Topic';
        }
        
        if (!nextButton.disabled) {
            const nextIndex = currentTopicIndex + 1;
            const nextTopicName = document.querySelector(`.topics-list a[data-file="${orderedTopics[nextIndex]}"]`).textContent.trim();
            nextButton.innerHTML = `${nextTopicName} →`;
        } else {
            nextButton.textContent = 'Next Topic';
        }
        
        // Update sidebar arrow button states
        if (leftArrow) {
            leftArrow.style.opacity = prevButton.disabled ? '0.5' : '1';
            leftArrow.style.cursor = prevButton.disabled ? 'not-allowed' : 'pointer';
        }
        
        if (rightArrow) {
            rightArrow.style.opacity = nextButton.disabled ? '0.5' : '1';
            rightArrow.style.cursor = nextButton.disabled ? 'not-allowed' : 'pointer';
        }
    }
    
    // Update progress indicator
    function updateProgressIndicator() {
        // Only update progress for main topics (0-8), not reference materials
        if (currentTopicIndex >= 0 && currentTopicIndex <= 8) {
            const progress = (currentTopicIndex / 8) * 100;
            progressFill.style.width = `${progress}%`;
            currentTopicDisplay.textContent = currentTopicIndex;
        } else if (currentTopicIndex > 8) {
            // Reference materials
            progressFill.style.width = `100%`;
            currentTopicDisplay.textContent = "Complete";
        }
    }
    
    // Check for hash in URL on page load to navigate directly to a topic
    if (window.location.hash) {
        const fileFromHash = window.location.hash.substring(1);
        const mappedFile = fileNameMap[fileFromHash] || fileFromHash;
        
        // Verify the file exists in our navigation
        const matchingLink = Array.from(navLinks).find(link => 
            link.getAttribute('data-file') === mappedFile
        );
        
        if (matchingLink) {
            // Simulate a click on the matching link
            matchingLink.click();
        } else {
            // If hash not found, mark the overview link as active by default
            const overviewLink = document.querySelector('.topics-list a[data-file="Overview.md"]');
            overviewLink.classList.add('active');
            currentTopicIndex = 0;
            updateNavigationButtons();
            updateProgressIndicator();
        }
    } else {
        // Mark the overview link as active by default
        const overviewLink = document.querySelector('.topics-list a[data-file="Overview.md"]');
        overviewLink.classList.add('active');
        currentTopicIndex = 0;
        updateNavigationButtons();
        updateProgressIndicator();
    }
    
    // Function to load markdown content
    function loadMarkdownContent(fileName) {
        // Show loading indicator with a slight delay for better UX
        const loadingTimer = setTimeout(() => {
            contentArea.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading content...</p></div>';
        }, 150);
        
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdownText => {
                // Clear the loading timer
                clearTimeout(loadingTimer);
                
                // Convert markdown to HTML
                const htmlContent = marked.parse(markdownText);
                
                // Set the content
                contentArea.innerHTML = htmlContent;
                
                // Add a table of contents if the content is long
                if (contentArea.offsetHeight > 1000) {
                    addTableOfContents();
                }
                
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
                
                // Add copy buttons to code blocks
                document.querySelectorAll('pre').forEach(addCopyButton);
            })
            .catch(error => {
                // Clear the loading timer
                clearTimeout(loadingTimer);
                
                contentArea.innerHTML = `<div class="error">
                    <h2>Error Loading Content</h2>
                    <p>Failed to load the requested file: ${fileName}</p>
                    <p>Error details: ${error.message}</p>
                    <button id="retry-button" class="retry-button">Try Again</button>
                </div>`;
                
                // Add retry functionality
                document.getElementById('retry-button').addEventListener('click', () => {
                    loadMarkdownContent(fileName);
                });
            });
    }
    
    // Add a copy button to code blocks
    function addCopyButton(pre) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.addEventListener('click', () => {
            const code = pre.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
        pre.appendChild(button);
    }
    
    // Function to generate a table of contents
    function addTableOfContents() {
        const headings = document.querySelectorAll('#markdown-content h2, #markdown-content h3');
        if (headings.length < 3) return; // Only add ToC if there are enough headings
        
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h2>Contents</h2><ul></ul>';
        const tocList = toc.querySelector('ul');
        
        headings.forEach((heading, index) => {
            // Add ID to the heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const listItem = document.createElement('li');
            listItem.className = heading.tagName.toLowerCase();
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
            
            // Add click event to scroll smoothly
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`).scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        });
        
        // Insert TOC at the beginning of the content
        const firstHeading = document.querySelector('#markdown-content h1, #markdown-content h2');
        if (firstHeading) {
            firstHeading.parentNode.insertBefore(toc, firstHeading.nextSibling);
        } else {
            document.querySelector('#markdown-content').prepend(toc);
        }
    }
    
    // Add CSS styles for enhanced features
    const style = document.createElement('style');
    style.innerHTML = `
        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--gray);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid rgba(22, 160, 133, 0.2);
            border-top-color: var(--secondary);
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
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
        
        .retry-button {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: var(--secondary);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .retry-button:hover {
            background-color: var(--primary);
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
        
        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            color: #ddd;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 10;
        }
        
        .copy-button:hover {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
        }
        
        pre {
            padding-top: 2rem;
        }
        
        .table-of-contents {
            background-color: var(--toc-bg);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 2rem 0;
            border: 1px solid var(--border);
        }
        
        .table-of-contents h2 {
            font-size: 1.25rem !important;
            margin-top: 0 !important;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border);
            margin-bottom: 1rem;
        }
        
        .table-of-contents ul {
            list-style-type: none;
            margin: 0 !important;
            padding: 0;
        }
        
        .table-of-contents li {
            margin-bottom: 0.5rem;
            margin-left: 0 !important;
        }
        
        .table-of-contents li.h3 {
            margin-left: 1.5rem !important;
        }
        
        .table-of-contents a {
            color: var(--text);
            text-decoration: none;
            display: inline-block;
            padding: 0.25rem 0;
            transition: all 0.2s ease;
        }
        
        .table-of-contents a:hover {
            color: var(--secondary);
            transform: translateX(3px);
        }
        
        .nav-button {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            max-width: 48%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);
}); 