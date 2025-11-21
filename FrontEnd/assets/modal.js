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
            trash.addEventListener('click', async (event) => {

                const authToken = sessionStorage.getItem('authToken');
                try {
                    const tokenResponse = await fetch('http://localhost:5678/api/works/' + item.id, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + authToken
                        }
                    });
                    figure.remove();
                } catch (error) {
                    console.error('Error deleting work:', error);
                }

            });



            trash.innerHTML = '<i class="fa-solid fa-trash"></i>';

            /*trash.textContent = "trash"; //  */
            trash.classList.add('trash');
            figure.classList.add('positioned-element');




            const modalimg = document.createElement('img');
            /*const figcaption = document.createElement('figcaption');*/

            figure.appendChild(trash);



            modalimg.src = item.imageUrl;
            modalimg.classList.add('modalimage');

            /*figcaption.textContent = item.title; */

            figure.appendChild(modalimg);
            /*figure.appendChild(figcaption);*/
            modalpop.appendChild(figure);

        });

    }

    // Upload helper (safe stub removed) and wiring for the upload form
    (function wireUploadForm() {
        const form = document.getElementById('photoUpload');
        const fileInput = document.getElementById('uploadImage');
        if (!form || !fileInput) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const file = fileInput.files[0];
            if (!file) return alert('Please choose a file to upload.');

            const fd = new FormData();
            fd.append('image', file);
            const title = file.name.replace(/\.[^/.]+$/, '');
            fd.append('title', title || 'Uploaded');
            fd.append('category', 1);
            

            const token = sessionStorage.getItem('authToken');
            try {
                const res = await fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers: token ? { 'Authorization': 'Bearer ' + token } : {},
                    body: fd
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || res.statusText);
                }
                const newWork = await res.json();
                allWorks.push(newWork);
                displayWorks(allWorks);
                form.reset();
                alert('Upload successful');
            } catch (err) {
                console.error('Upload failed', err);
                alert('Upload failed: ' + err.message);
            }
        });
    })();

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

   
   
    });
