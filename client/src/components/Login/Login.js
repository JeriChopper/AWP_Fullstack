import {useState} from 'react'

function Login({setJwt, jwt, setUser}) {
    const [userData, setUserData] = useState({})

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const submit = (e) => {

        e.preventDefault()

        fetch('/login',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                if(data.token) {
                    setJwt(data.token)
                    setUser({email: data.user.email})
                }
            })
    }


    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form onChange={handleChange} onSubmit={submit}>
                <div className='login-email'>
                    <input type="text" placeholder="Email" name="email"/> 
                </div>
                <div className='login-password'>
                    <input type="password" placeholder="Password" name="password"/>
                </div>
                <div className='login-button'>
                    <input type="submit" name="submit"/>
                </div>
                <div className='register-link'>
                    <p>Don't have an account? <a href=''>Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login