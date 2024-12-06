import { auth, signInWithEmailAndPassword } from "./firebase.js"
let logIN = () => {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("you're logged in")
            console.log(user);
            window.location.href = "./index.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("you're not logged in")
            console.log(errorMessage)
        });

}

let log_in = document.getElementById("log-in")
log_in.addEventListener("click",logIN)