document.addEventListener('DOMContentLoaded', () => {
    // We will store the portfolio works here to avoid fetching them repeatedly
    let allWorks = [];

    /**
     * Displays works in the gallery.
     * @param {Array} works - An array of work objects to display.
     */
    function displayWorks(works) {
        const modalpop = document.querySelector('.modal-body');
        // Clear the gallery before displaying new or filtered works
        modalpop.innerHTML = '';

        works.forEach(item => {
            const figure = document.createElement('figure');





            const trash = document.createElement('button');
trash.textContent = "trash"; // You can replace this with an actual trash bin icon/image
trash.classList.add('trash');
figure.classList.add('positioned-element');




            const modalimg = document.createElement('img');
            /*const figcaption = document.createElement('figcaption');*/
            const addphoto = document.createElement('button');
figure.appendChild(trash);


            
                modalimg.src = item.imageUrl;
                modalimg.classList.add('modalimage');
               
                /*figcaption.textContent = item.title; */

                figure.appendChild(modalimg);
                /*figure.appendChild(figcaption);*/
                modalpop.appendChild(figure);

          
                

            




        });
    }



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
            /* createFilterButtons(categories); */
        } catch (error) {
            console.error('Initialization failed:', error);

            const modalpop = document.querySelector('.modal-body');
            if (modalpop) modalpop.innerHTML = '<p>Error loading modal.</p>';
        }

    }

    initializePage();

})