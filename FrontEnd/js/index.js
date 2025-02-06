// fetch call to get jobs

// inside of the second .then function
// create elements and add them to the gallery <div class="gallery">

// Your code should look pretty much the same as the code in index.html after you create it

// add attributes called data-category-<id> to each figure
// use event listeners to update the class that is on the appropriate gallery item to hide or display them

async function getData() {
  const url = "http://localhost:5678/api/works";
  const response = await fetch(url);
  const json = await response.json();
  // console.log(json)
  // // Grab first element of json
  // //Test that it works
  // //Test the title and URL parameter
  // const title = work.title
  // console.log('I expect to get the title', title)
  // // call createfigure and pass in the title and url
  // createFigure(title, image)
  //list of item
  for (const work of json) {
    const title = work.title;
    console.log("I expect to get the title", title);
    const image = work.imageUrl;
    console.log("I expect to get imageURL", image);
    const categoryId = work.category.id;
    console.log("I expect to get the category", categoryId);
    createFigure(title, image, categoryId);
  }
}
// //list of item
// for (const work of json) {
//      console.log(item);
// }
getData();

function createFigure(title, imageUrl, categoryId) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;
  img.classList.add("image")
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = title;
  figure.dataset.categoryId = categoryId;
  //Append img and figcaption to figure
  figure.appendChild(img);
  figure.appendChild(figcaption);

  document.body.appendChild(figure);
  const gallery = document.querySelector(".gallery");
  gallery.appendChild(figure);
}


// Get Categories
// Create each category button dynamically
// Add an event listener to each button
// Update the create figure to have data attributes that assign each catgory to each figure

// Get Categories
async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  const response = await fetch(url);
  const json = await response.json();
  //Create All Category button (can hardcode)
  createCategoryButton(0, "All");
  // Iterate through the categories
  for (const category of json) {
    const name = category.name;
    const id = category.id;
    createCategoryButton(id, name);
    console.log("I expect to get Category name:", name);
  }
}
getCategories();

function createCategoryButton(id, name) {
  const categoryButton = document.createElement("button");
  categoryButton.textContent = name;
  categoryButton.dataset.id = id;
  //Add class
  //Add id as data attribute
  const buttonContainer = document.getElementById("button-container");
  buttonContainer.appendChild(categoryButton);
  //  Add eventListener
  categoryButton.addEventListener("click", function (event) {
    alert(`${name} button is clicked`);
    const clickedId = event.target.dataset.id;
    // Get the id from event
    
    //Add a class that displays the images with the matching id
    const figcaptions = document.querySelectorAll("figure");
    //if id is 0 display All
    figcaptions.forEach(figCaption => {
        if (clickedId === "0") {
          figCaption.style.display = "block";
        } else if (figCaption.dataset.categoryId === clickedId) {
          figCaption.style.display = "block";
        } else {
          figCaption.style.display = "none";
        }
      });
  });
}

