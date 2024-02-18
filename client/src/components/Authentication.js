import { useState } from 'react';

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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          setJwt(data.token);
          setUser({ email: data.user.email });
        }
      });
  };

  const switchForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  return (
    <div>
      <h2>{isRegisterForm ? 'Register' : 'Login'}</h2>
      <form onChange={handleChange} onSubmit={submit}>
        <div>
          <input type="text" placeholder="Email" name="email" />
        </div>
        <div>
          <input type="password" placeholder="Password" name="password" />
        </div>
        <input type="submit" />
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