
// Fetching data from an API using the Fetch API
// This example fetches user data from the ReqRes API   
// console.log (fetch('https://reqres.in/api/users'));
// The fetch function returns a Promise that resolves to the Response object


// The Response object contains the status, headers, and body of the response
// to see what the response looks like
let apiRequest = new XMLHttpRequest();
apiRequest.open('GET','http://localhost:5678/api/users/login');


/* adding a post to the site
const addPostButton = document.getElementById('add-post');
//since the post dont have an ID well use the parent named section
const articleSection = document.querySelector('section');

const removePostButton = document.getElementById('remove-post');

addPostButton.addEventListener ('click', () => {
    const newPost = createNewPost();
  articleSection.appendChild(newPost);
                                });