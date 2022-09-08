import React, { useState} from "react";
import { hot } from 'react-hot-loader/root';
import { useNavigate } from 'react-router-dom';

//react router is just serving up different components based on whatever. We can't use the refresh then.

//could do an onchange for either box taht checks if it's the same as the other box. if it isn't can say wahtever.
//In actual button, only make the post req if they're the same

function SignupPage() {
    //first let's make a login button that will navigate to the SearchContainer when clicked.
    const navigate = useNavigate();


    //To handle if the passwords are not matching:
    //Need to create an onchange functionality that will trigger only when the passwords match.
    //So create a function that will look at the 'confirm password' and on each change to what is typed in the box, it will check to see if it is the exact same string as the 'password'
    //If it is the same, then change the borders to green and allow the sign up button to be clicked.
    //Otherwise, change the border to red and do not allow the signup button to be clicked.
    const [password, setPassword] = useState("")
    const [vpassword, setVPassword] = useState("")

    const confirmPassword = (e) => {
        setVPassword(document.getElementById('confirmPassword').value);

        if (password != document.getElementById('confirmPassword').value){
            if (password.length <= 8 || password.length > 15){
                console.log('NOOoOoOOOOoo')
                e.target.style.border = 'medium solid red';
            }
            console.log("NOOOO!")
            e.target.style.border = 'medium solid red';
        }
        else {
            console.log("YAY!")
            e.target.style.border = 'medium solid green';
        }
    }

    //create a function to send a post request once the required text fields are filled in and the passwords match:
    function sendPostRequest(e) {
        console.log("sending Post!")
        //If password!=confrimPassword then throw and error:
        if(document.getElementById('password').value != document.getElementById('confirmPassword').value) {console.log('Your passwords do not match!')}
        //else we make a fetch call and post request and include the username and password in the body to be sent to our server:
        else{
        fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: document.getElementById('username').value,
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
}
    //Do we want to display a popup that says 'Account created Succesfully before the redirect?'

    //return the elements that you want to be displayed on the page:
    return (
        <div className="signupPage">
            <input type="text" placeholder="username" id="username"/>
            <br></br>
            <input type="password" placeholder="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <br></br>
            <input type="password" placeholder="Confirm passsword" id="confirmPassword" onChange={confirmPassword}/>
            <br></br>
            <button onClick={sendPostRequest}>Sign Up!</button>
        </div>
    )
}

export default SignupPage;