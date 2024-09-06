const explore = document.getElementById('explore');
const home = document.getElementById('home');
const divs = document.querySelectorAll('.bgc');


const showImgCon = document.getElementById('show-img-container');
const backButton = document.getElementById('button-back');
const displayImgPost = document.getElementById('display-img-post');
// const images;



backButton.addEventListener('click', () => {
  showImgCon.style.display = 'none';

})

// Get all the divs inside the super div

// Loop through each div to attach a click event listener
divs.forEach(function(div) {
    div.addEventListener('click', function() {
        // Remove the class from all divs

        // if(div.classList.contains('active')){
        //     div.classList.remove('active');
        // } else {
        //     div.classList.add('active');

        // }

        divs.forEach(function(d) {
            d.classList.remove('active');
        });
        
        // Add the class to the clicked div
        div.classList.add('active');
    });
});





console.log("IN PROFILE IS WORKIGN SEE THIS HELLO HOE SRE________________ ");



async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      console.log("mydata : " + data.data);

      if (data.success) {
        displayPosts(data.data);
      } else {
        document.getElementById('posts-container').innerHTML = 'No posts found';
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      document.getElementById('posts-container').innerHTML = 'Error fetching posts';
    }
  }

  function displayPosts(posts) {
    const postsContainer = document.getElementById('inn-con');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('img-card');

      postDiv.innerHTML = `
        <div class="imgdiv">
        <img class="post-img" src="${post.post}" alt="${post.title}" data-id="${post._id}" />
        </div>
        <p>${post.owner.username}</p>
      `;

      postsContainer.appendChild(postDiv);
    });

    const images = document.querySelectorAll('.post-img');
    images.forEach(image => {
      image.addEventListener('click', handleImageClick);

      // image.addEventListener('mouseover', handleImageHover);
      // image.addEventListener('mouseout', handleImageOut);
  });


  }

  // Call fetchPosts to load all posts
  fetchPosts();




function handleImageClick(event) {
  const imageId = event.target.getAttribute('data-id');
  const imageSrc = event.target.getAttribute('src');
  // event.target.style.border = "2px solid red";
  // console.log('Image clicked with ID:', imageId);

  console.log("img src : " + imageSrc);

  showImgCon.style.display = 'flex';
  displayImgPost.src = imageSrc;

}

function handleImageHover(event) {
  event.target.style.border = "2px solid red";
}

function handleImageOut(event) {
  event.target.style.border = "none";
}





// const navChild = document.querySelector('#profile-nav > a');

// explore.addEventListener('click', () =>{
//     home.classList.remove('active');
//     explore.classList.add('active');
// })