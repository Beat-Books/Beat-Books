import React from "react";
import { hot } from 'react-hot-loader/root';
import { useNavigate } from 'react-router-dom';



function LandingPage() {
    //first let's make a login button that will navigate to the SearchContainer when clicked.
    const navigate = useNavigate();
    //POST request to send our info to the backend for authentication:
    function sendLoginPost(){
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value})
    }  
    )
    .then(res => res.json())
    .then(res => {navigate('/search')})
    .catch(err => console.log('Error:', err))
}



    //func to redirect you to signup if you don't have an account already.
    function redirectToSignup(){
        console.log('you have invoked the redirectToSignup function')
        return navigate('/signup');
    }
    return (
        <div className="landingPage">
            <input type="text" placeholder="username" id="username"/>
            <br></br>
            <input type="password" placeholder="passsword" id="password"/>
            <br></br>
            <button onClick={sendLoginPost}>Login</button>
            <p>Don't have an account?</p>
            <button onClick={redirectToSignup}>Sign Up</button>
        </div>
    )
}

export default LandingPage;