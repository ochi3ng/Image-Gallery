import React, { useState } from 'react';
import { database } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(database, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user);
          navigate('/login')
      })
      .catch((error) => {
        const errorMessage = error.message;
          if (errorMessage.includes("auth/email-already-in-use")){
            setErrorMessage("The Email has been used")
            return
        }
          if (errorMessage.includes("auth/weak-password")){
              setErrorMessage("Password should be at least 6 characters")
              return
          }
          if (errorMessage.includes("auth/invalid-email")){
            setErrorMessage("invalid email")
            return
          }
          if (errorMessage.includes("auth/network-request-failed")){
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
        <h1>Welcome!</h1>
        <h2>Please SignUp</h2>
        <input name='email' className='input' placeholder='Email' />
        <input name='password' className='input' placeholder='Password' type='password' />
        <button type='submit' className='button'>SignUp</button>
        {errorMessage && <p className='error'>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SignUp;
