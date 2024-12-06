import { app } from "./database.mjs";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore(app);


// Initialize an empty array to store the posts
// let postsArray = [];
const querySnapshot = await getDocs(collection(db, "posts"));
const uniqueCategories = new Set();
querySnapshot.forEach((doc) => {
    const postsData = doc.data();
    // postsArray.push(postsData); // Add each post's data to the array
    console.log(postsData);

    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML += `<div class="col-md-10">
                            <div class="card-body">
                                <p class="size">${postsData.topic}</p>
                                <p class="card-text">${postsData.description}.</p>
                                <p class="card-text"><small class="text-body-secondary">${postsData.date}</small>
                                <p class="card-text"><small class="text-body-secondary">${postsData.author}</small>
                                </p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <img src="https://i.pinimg.com/736x/88/76/70/887670b8278259732a1adf17de0f95c2.jpg" class="img-fluid rounded-start" alt="...">
                       </div>`

    const BlogCategory =document.getElementById("BlogCategory")
    if (!uniqueCategories.has(postsData.category)) { // Check if the category is not already added
      uniqueCategories.add(postsData.category); // Add the category to the Set
      BlogCategory.innerHTML += `<li>${postsData.category}</li>`;
      BlogCategory.style.cursor = "pointer";

    }
});



const categoryItems = BlogCategory.querySelectorAll("li");

// Add click event listeners to each <li>
categoryItems.forEach((categoryItem) => {
  categoryItem.addEventListener("click", () => {
    const selectedCategory = categoryItem.textContent; // Get the category name
    if (selectedCategory == "All") {
         location.reload();
    } else {
        filterPostsByCategory(selectedCategory);
    }
  });
});

// Function to filter posts by a category
function filterPostsByCategory(category) {
  postContainer.innerHTML = ""; // Clear existing posts

  querySnapshot.forEach((doc) => {
    const postsData = doc.data();

    // Only show posts that match the selected category
    if (postsData.category === category) {
      postContainer.innerHTML += `
        <div class="col-md-8">
          <div class="card-body">
            <p class="size">${postsData.topic}</p>
            <p class="card-text">${postsData.description}.</p>
            <p class="card-text"><small class="text-body-secondary">${postsData.date}</small></p>
          </div>
        </div>
        <div class="col-md-4">
          <img src="https://i.pinimg.com/736x/88/76/70/887670b8278259732a1adf17de0f95c2.jpg" class="img-fluid rounded-start" alt="...">
        </div>`;
    }
  });
}

const gobtn = document.getElementById("gobtn")
gobtn.addEventListener("click", () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    
    console.log(user);
    
    if (user) {
      // User is logged in
      window.location.href = "dashboard.html"; // Redirect to Create Post page
    } else {
      // User is not logged in
      window.location.href = "login.html"; // Redirect to Login page
    }
  });
  
})

async function fetchPosts(category = "") {
  const querySnapshot = await getDocs(collection(db, "posts"));
  postContainer.innerHTML = ""; // Clear existing posts

  querySnapshot.forEach((doc) => {
    const postsData = doc.data();

    // Filter posts by category if a category is specified
    if (!category || postsData.category?.toLowerCase() === category.toLowerCase()) {
      postContainer.innerHTML += `
        <div class="col-md-8">
          <div class="card-body">
            <p class="size">${postsData.topic}</p>
            <p class="card-text">${postsData.description}.</p>
            <p class="card-text"><small class="text-body-secondary">${postsData.date}</small></p>
          </div>
        </div>
        <div class="col-md-4">
          <img src="https://i.pinimg.com/736x/88/76/70/887670b8278259732a1adf17de0f95c2.jpg" class="img-fluid rounded-start" alt="...">
        </div>`;
    }
  });
}

//   Fetch all posts initially
fetchPosts();



const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent page refresh
    const category = document.getElementById("categorySearch").value;
    fetchPosts(category); // Fetch posts matching the category
  });