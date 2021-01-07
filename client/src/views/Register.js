import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";


export default function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const [msg, setMsg] = useState("");

    const dispatch = useDispatch();


    const handleSubmit = (event) => {

        setMsg("");
        event.preventDefault();
        if(!username || !password) return setMsg("Please Complete All Fields");
        if(repassword !== password) return setMsg("Passwords do not match");


        axios.post("http://localhost:3001/register", 
        {
            username,
            password
        })
        .then(response =>{
            console.log(response);
            props.history.push("/login");
        })
        .catch(err=>{
            setMsg("Something Went Wrong");
            console.log(err);
        })
        
    } 

    return (
        <div className="register">
            <form>
                <input type="username" onChange={(e)=> setUsername(e.target.value)} className="input-group mb-2" placeholder="Enter username" />
                <input type="password" onChange={(e)=> setPassword(e.target.value)} className="input-group mb-2" placeholder="Enter password" />
                <input type="password" onChange={(e)=> setRePassword(e.target.value)} className="input-group mb-2" placeholder="Re-Enter password" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>{msg}</p>
        </div>
    )
}
