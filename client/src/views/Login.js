import React, { useState } from 'react';
import axios from 'axios';
import store from '../redux/store'
import {setUser} from "../redux/"
import { useDispatch } from "react-redux";


export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        setMsg("");
        event.preventDefault();
        if(!username || !password) return setMsg("Please Complete All Fields");

        axios.post("http://localhost:3001/login", 
        {
            username,
            password
        })
        .then(response=>{
            console.log(response);
            if(response.data.ok){
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("token", response.data.token);
        
                dispatch({type: "SET_USER", payload: {
                    username: response.data.username,
                    token: response.data.token
                }})
                props.history.push("/");
            }else{
                setMsg("Incorrect username or password");
            }
        })
        .catch(err=>{
            setMsg("Something Went Wrong");
            console.log(err);
        })
        
    } 

    return (
        <div className="login">
            <form>
                <input type="username" onChange={(e)=> setUsername(e.target.value)} className="input-group mb-2" placeholder="Enter username" />
                <input type="password" onChange={(e)=> setPassword(e.target.value)} className="input-group mb-2" placeholder="Enter password" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>{msg}</p>
        </div>
    )
}
