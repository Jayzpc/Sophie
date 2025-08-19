document.addEventListener('DOMContentLoaded', () => {
    // We will store the portfolio works here to avoid fetching them repeatedly
    let allWorks = [];

    /**
     * Displays works in the gallery.
     * @param {Array} works - An array of work objects to display.
     */
    function displayWorks(works) {
        const gallery = document.querySelector('.gallery');
        // Clear the gallery before displaying new or filtered works
        gallery.innerHTML = '';

        works.forEach(item => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            img.src = item.imageUrl;
            figcaption.textContent = item.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    }

    /**
     * Creates filter buttons for categories.
     * @param {Array} categories - An array of category objects.
     */
    function createFilterButtons(categories) {
        // Make sure you have a <div id="filters"></div> in your index.html
        const filtersContainer = document.getElementById('filters');
        if (!filtersContainer) return;

        // Create "All" button
        const allButton = document.createElement('button');
        allButton.textContent = 'All'; // 
        allButton.classList.add('button', 'active'); // Start with "All" as active
        allButton.dataset.categoryId = 'all';
        filtersContainer.appendChild(allButton);

        // Create buttons for each category from the API
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.classList.add('button');
            // Store the category ID in a data attribute for easy access
            button.dataset.categoryId = category.id;
            filtersContainer.appendChild(button);
        });

        // Add a single event listener to the container for all buttons
        addFilterEventListeners(filtersContainer);
    }

    /**
     * Adds event listeners to the filter buttons to handle clicks.
     * @param {HTMLElement} filtersContainer - The container for the filter buttons.
     */
    function addFilterEventListeners(filtersContainer) {
        filtersContainer.addEventListener('click', (event) => {
            // Only act if a button was clicked
            if (event.target.tagName !== 'BUTTON') return;

            const clickedButton = event.target;
            const categoryId = clickedButton.dataset.categoryId;   //dataset is same as querySelector

            // Update active state for buttons
            const allButtons = filtersContainer.querySelectorAll('.button');
            allButtons.forEach(btn => btn.classList.remove('active'));
            clickedButton.classList.add('active');

            // Filter and display works based on the clicked category
            if (categoryId === 'all') {
                displayWorks(allWorks);
            } else {
                const filteredWorks = allWorks.filter(work => work.categoryId == categoryId);
                displayWorks(filteredWorks);
            }
        });
    }

    /**
     * Main function to fetch data and initialize the page.
     * Using async/await for cleaner asynchronous code.
     */
    async function initializePage() {
        try {
            // Fetch works
            const worksResponse = await fetch('http://localhost:5678/api/works');
            if (!worksResponse.ok) throw new Error('Failed to fetch works');
            allWorks = await worksResponse.json();
            displayWorks(allWorks);

            // Fetch categories and create buttons
            const categoriesResponse = await fetch('http://localhost:5678/api/categories');
            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
            const categories = await categoriesResponse.json();
            createFilterButtons(categories);
        } catch (error) {
            console.error('Initialization failed:', error);
            const gallery = document.querySelector('.gallery');
            if (gallery) gallery.innerHTML = '<p>Error loading projects.</p>';
        }
    }

    // Run the initialization when the DOM is loaded
    initializePage();
});
