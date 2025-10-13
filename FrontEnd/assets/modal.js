 function displayWorks(works) {
        const gallery = document.querySelector('modal-body');
        // Clear the gallery before displaying new or filterworks
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

        displayWorks(allWorks);
    }