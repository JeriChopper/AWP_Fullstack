import React, {useEffect, useState} from 'react'

function Login() {
    const [userData, setUserData] = useState({})

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="text" name="username"/>
                <input type="password" name="password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login