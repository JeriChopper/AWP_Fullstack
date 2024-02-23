/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code



///Imports and dependencies
import { useState } from 'react';
import './auth.css';

/// This is where I started the front end. Decided to make a responsive register/login forum instead of two seperate pages. 

/// https://www.youtube.com/watch?v=kghwFYOJiNg Inspiration from the Authorization form took from here. Especially Interface wise.
/// https://www.youtube.com/watch?v=F53MPHqOmYI Used in the front end code as a guide

function Authentication({ setJwt, setUser }) {
  const [userData, setUserData] = useState({});
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
  
    const endpoint = isRegisterForm ? '/register' : '/login'; // used endpoint as I do not need to have any logic in the frontend, only fetch the data. 
  
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        console.log(data);
        if (data.token) {
          setJwt(data.token); // setJwt to jwt
          setUser({ email: data.user.email }); // setUser to registered email
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          console.log('Email in use')
        } else if (error.status === 401) {
          console.log('Wrong credentials');
        } else if (error.status === 500) {
          console.log('Internal server error, try again');
        }
      });
  };



  const switchForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  return (
    <div className='wrapper'>
      <form onChange={handleChange} onSubmit={submit}>
        <h2>{isRegisterForm ? 'Register' : 'Login'}</h2>
        <div className='email-box'>
          <input type="text" placeholder="Email" name="email" />
        </div>
        <div className='password-box'>
          <input type="password" placeholder="Password" name="password" />
        </div>
        <div className='submit-button'>
          <button type="submit" name="submit">Submit</button>
        </div>
        <div className='login-link'>
          <p>{isRegisterForm ? 'Already registered? ' : 'Don\'t have an account? '}
             <button type="button" onClick={switchForm}>
               {isRegisterForm ? 'Login' : 'Register'}
             </button>
          </p>
        </div>
      </form>
    </div>
    
  );
}

export default Authentication;