import { useState } from 'react';
import './auth.css';

function Authentication({ setJwt, setUser, initialForm }) {
  const [userData, setUserData] = useState({});
  const [isRegisterForm, setIsRegisterForm] = useState(initialForm === 'register');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
  
    const endpoint = isRegisterForm ? '/register' : '/login';
  
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
          setJwt(data.token);
          setUser({ email: data.user.email });
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