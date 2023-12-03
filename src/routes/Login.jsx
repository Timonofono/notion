import React, {useContext, useState} from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const userContext = useContext(UserContext)
    const navigate = useNavigate();

    function handleLogin() {
        // TODO: validate data
        const querry = new URLSearchParams({
            email,
            password
        }).toString()
        fetch(`http://localhost:5001/users?${querry}`)
        .then((r) => r.json())
        .then(users => users[0])
        .then(user => {
            if (user) {
                userContext.onChange(user)
                return navigate('/')
            } else {
                setError('Invalid user')
            }   
        })
    }


function handleSignUp() {
    alert('Not implemented')
}

return (
    <div className=" p-20">
        <h1 className="prose flex flex-col font-bold text-2xl text-center">Login</h1>
        <input
            className="border-2 border-solid border-black pl-2 flex flex-row mt-4 w-1/3" 
            placeholder="email"
            value={email}   
            onChange={(e) => setEmail(e.target.value)}
        />
         <input
            className="border-2 border-solid border-black pl-2 mt-4 w-1/3"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button className=" flex flex-row mt-4" onClick={handleLogin}>Login</button>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <div className="mt-4">
            <Link to="/signup">
                Create an accaunt   
            </Link>
        </div>
        <hr className=" w-30 mt-4" />
        <div className=" flex flex-row text-justify">
            <p className="text-xs text-justify">Create by Dikonov Timofey</p>
            <p className=" text-xs text-justify">BSU 2023</p>
        </div>
    </div>
);
}