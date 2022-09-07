import React from "react";
import { hot } from 'react-hot-loader/root';
import { useNavigate } from 'react-router-dom';

//react router is just serving up different components based on whatever. We can't use the refresh then.

//could do an onchange for either box taht checks if it's the same as the other box. if it isn't can say wahtever.
//In actual button, only make the post req if they're the same

function SignupPage() {
    //first let's make a login button that will navigate to the SearchContainer when clicked.
    const navigate = useNavigate();
    //create a function to send a post request once the required text fields are filled in and the passwords match:
    function sendPostRequest(e) {
        //If password!=confrimPassword then throw and error:
        // How to do this?
        // if(password != confirmPassword) {return 'Your passwords don\'t match!'};
        if(document.getElementById('password').value != document.getElementById('confirmPassword').value) {return 'Your passwords do not match!'}
         //else we make a fetch call and post request and include the username and password in the body to be sent to our server:
        fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                usermail: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        }
    )
    /* turn this response back into js readable information */
    .then(res => res.json())
    .then(res => {
            /* redirect here if successful? */ navigate('/login');
        }
    )
    .catch(err => console.log('Error:', err))
}
    //Do we want to display a popup that says 'Account created Succesfully before the redirect?'

    //return the elements that you want to be displayed on the page:
    return (
        <div className="signupPage">
            <input type="text" placeholder="username" id="username"/>
            <br></br>
            <input type="password" placeholder="password" id="password"/>
            <br></br>
            <input type="password" placeholder="Confirm passsword" id="confirmPassword"/>
            <br></br>
            <button onClick={sendPostRequest}>Sign Up!</button>
        </div>
    )
}

export default SignupPage;