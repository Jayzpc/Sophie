/*

You fetch the data and parse it as JSON.
You select the .gallery element.
You loop through each item in the data array.
For each item, you create a figure, img, and figcaption.
You set the image source and caption text.
You append the img and figcaption to the figure, and the figure to the gallery.


handle the response */
// to see what the response looks like


// fetch('http://localhost:5678/api/works',)
// .then((response => {
//if (response.ok) { /* Check if the response status is OK (status code 200) */
//    return response.json();  Parse the response body as JSON */

//}
//})

// for loop to go through each item in the response and create a figure element for each one

// where on the page the figures will be added
//.then((data) => {
//    const gallery = document.querySelector('.gallery');
//)

//const postsGallery = document.querySelector('gallery.figure');

//let postRequest = new XMLHttpRequest();
//postRequest.open('GET', 'http://localhost:5678/api/works', true);
fetch('http://localhost:5678/api/works')
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })

    /*
    //postRequest.onreadystatechange = () => {
    //    if (postRequest.readyState === 4) {
    
    
    //const response = JSON.parse(postRequest.response);
    
    */
    .then(data => {
        const gallery = document.querySelector('.gallery');
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            console.log(item); // log each item, not the whole data array

            // create elements to hold the data
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            img.setAttribute('src', item.imageUrl);
            figcaption.textContent = item.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    })


// setup filters and categories
// fetch categories from the API
// fetch('http://localhost:5678/api/categories')

fetch('http://localhost:5678/api/categories')
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })

    //    console.log('Button clicked!');

    .then(data => {

        //this constant is where we put our buttons
        // see line 43 in index.html to see where the id filters is
        const filters = document.getElementById('filters');

        //we create allFilter button with createElement
        const allFilter = document.createElement('button');

        // we create a class of the button and set it
        // this is the class that is used in the CSS
        // its like addClassList in jQuery
        allFilter.setAttribute('class', 'button');
        // creates the all button with TextContent
        allFilter.textContent = 'All';
  })      

 const filters = document.getElementById('filters');
const objectFilter = document.createElement('button');
objectFilter.setAttribute('class', 'button');
objectFilter.textContent = 'object';






filters.appendChild(allFilter);
        // the for loop gets all the categories from the API
        // index =0 is all, index 2 is Hotels and restaurants
        for (let index = 0; index < data.length; index++) {


       

            const category = data[index];
            console.log(category.name); // 


            const filterButton = document.createElement('button');

             // we create a class of the button and set it
        // this is the class that is used in the CSS
        // its like addClassList in jQuery
        filterButton.setAttribute('class', 'button active');
        // creates the all button with TextContent
        filterButton.textContent = category.name;

filterButton.addEventListener('click', () => {
            // toggle on and off the active class
            // remove the active class from all buttons
            const activeButtons = document.querySelector('.active');
        //    activeButton.classList.remove('active');
            

})

        }
    
//  const myButton = document.getElementById('objects');
//  all.addEventListener('click', function() {

// gallery.appendChild(figcaption)
//img
//newGallery.appendChild(newTitle);
//newGallery.appendChild(newImageUrl);

//postsGallery.appendChild(newGallery);

//postRequest.send();

//const filterButtons = document.querySelector('filterButtons');
/*const all = document.getElementById('all');
const objects = document.getElementById('objects');
const apartments = document.getElementById('apartments');
const hotels = document.getElementById('hotels');

all.addEventListener('click', () => {
    console.log();
}); 

/*objects.addEventListener('click', () => {
    console.log('Objects button clicked');
});

apartments.addEventListener('click', () => {
    console.log('Apartments button clicked');
});

hotels.addEventListener('click', () => {
    console.log('Hotels button clicked'); */
