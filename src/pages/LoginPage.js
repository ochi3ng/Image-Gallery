import React, { useState } from 'react';
import { database } from './firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';



function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        signInWithEmailAndPassword(database, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log('User created:', user);
                navigate('/image'); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage.includes("auth/too-many-requests")) {
                    setErrorMessage("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
                    return
                }
                if (errorMessage.includes("auth/weak-password")) {
                    setErrorMessage("Password should be at least 6 characters")
                    return
                }
                if (errorMessage.includes("auth/invalid-login-credentials")) {
                    setErrorMessage("Invalid email or password")
                    return
                }
                if (errorMessage.includes("auth/network-request-failed")) {
                    setErrorMessage("Please check your internet connection")
                    return
                }
                console.error('Error creating user:', errorMessage
                );
                setErrorMessage(errorMessage);
            });
    }

    return (
        <div className='container'>
            <form className='formStyle' onSubmit={(e) => handleSubmit(e)}>
                <h1>LogIn</h1>
                <input name='email' className='input' placeholder='Email' />
                <input name='password' className='input' placeholder='Password' type='password' />
                <button type='submit' className='button'>Login</button>
                {errorMessage && <p className='error'>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;