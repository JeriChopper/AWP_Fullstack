import { application, response } from 'express'
import React, {useEffect, useState} from 'react'

function Login() {
    const [userData, setUserData] = useState({})

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const submit = (e) => {

        e.preventDefault()

        fetch("/login",{
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
            })
    }


    return (
        <div>
            <h2>Login</h2>
            <form onChange={handleChange} onSubmit={submit}>
                <input type="text" name="username"/>
                <input type="password" name="password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login