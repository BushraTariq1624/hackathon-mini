import { app } from "./firebase.js"
import { getFirestore , collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore(app);


const mainForm = document.getElementById("postForm");


const submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", async(e) => {
    e.preventDefault()

    const postTopic = document.getElementById("postTopic").value
    const postCategory = document.getElementById("postCategory").value
    const postDescription = document.getElementById("postDescription").value
    const postAuthor = document.getElementById("postAuthor").value

    try {
        const docRef = await addDoc(collection(db, "posts"), {
          topic : postTopic,
          category : postCategory,
          description : postDescription,
          author : postAuthor,
          date : new Date().toLocaleString()
        });
        mainForm.reset();
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "dashboard.html"
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
})
