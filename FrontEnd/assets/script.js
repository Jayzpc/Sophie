/*

You fetch the data and parse it as JSON.
You select the .gallery element.
You loop through each item in the data array.
For each item, you create a figure, img, and figcaption.
You set the image source and caption text.
You append the img and figcaption to the figure, and the figure to the gallery.


// .then((response => { /* This line is commented out, but it seems like it was intended to handle the response */
// if (response.ok) { /* Check if the response status is OK (status code 200) */
//     return response.json(); /* Parse the response body as JSON 
// }
// })) /* This line is commented out, but it seems like it was intended to handle the response */
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

    const myButton = document.getElementById('filter');
    myButton.addEventListener('click', function() {
        // Code to execute when the button is clicked



        console.log('Button clicked!');
    });

// gallery.appendChild(figcaption)
//img
//newGallery.appendChild(newTitle);
//newGallery.appendChild(newImageUrl);

//postsGallery.appendChild(newGallery);

//postRequest.send();

