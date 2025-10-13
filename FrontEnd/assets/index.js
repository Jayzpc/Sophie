    function checkLoginStatus() {
        const authToken = sessionStorage.getItem('authToken');
        const loginLink = document.querySelector('header nav ul li a[href="login.html"]');

        if (authToken) {
            console.log("User is logged in.");
            document.body.classList.add('logged-in');

            if (loginLink) {
                loginLink.textContent = 'logout';
                loginLink.href = '#';
                loginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    sessionStorage.removeItem('authToken');
                    window.location.reload(); // Reload to reflect logged-out state
                });
            }
        } else {
            console.log("User is not logged in.");
            // No need to do anything, the absence of 'logged-in' class will hide elements
        }
    }

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // We will store the portfolio works here to avoid fetching them repeatedly
    let allWorks = [];

    /**
     * Displays works in the gallery.
     * @param {Array} works - An array of work objects to display.
     */
    function displayWorks(works) {
        const gallery = document.querySelector('#portfolio .gallery');
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
     * Using async/await as per notes
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
            const gallery = document.querySelector('#portfolio .gallery');
            if (gallery) gallery.innerHTML = '<p>Error loading projects.</p>';
        }
    }

    // Run the initialization when the DOM is loaded
    initializePage();
   checkLoginStatus(); 
});
