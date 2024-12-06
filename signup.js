import { auth, createUserWithEmailAndPassword } from "./firebase.js"
let signUP = () => {
    let email = document.getElementById("email-input").value 
    let password =document.getElementById("password-input").value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("signed-in")
            console.log(user);
            window.location.href="login.html"

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("error")
            console.log(errorMessage);

        });
}
let sign_up = document.getElementById("sign-up")
sign_up.addEventListener("click",signUP)