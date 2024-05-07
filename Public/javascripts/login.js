document.addEventListener("DOMContentLoaded", function () {
    const loginForm=document.getElementById("loginform");


loginForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    const username = loginForm.elements["username"].value;
    const password = loginForm.elements["password"].value;


    if(username==="user" && password ==="user123"){
        alert("You have successfully logged in.");
        location.reload();
    }
    else{
        alert("Invalid username or password");
    }
})
})






