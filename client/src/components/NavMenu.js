import React from 'react';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';



export default function NavMenu(props) {
    var user = useSelector(state => state.user.user.username);
    const dispatch = useDispatch();

    const handleLogOut = ()=> {
        localStorage.setItem('username', null);
        localStorage.setItem('token', null);

        dispatch({type: "SET_USER", payload: {}});
        dispatch({type: "SET_TODOS", payload: {}});
    }


    return (
        <header className="app-header">
          
                <Link className="link" to="/"><h3 className="app-heading">Launchtrip Assignment - Arvind Dhindsa</h3></Link>
            {user ? 
            (
                <button className="btn btn-secondary" onClick={handleLogOut} >Logout</button>
            )
            :
            (
                <div>      
                    <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                    <Link to="/register"><button className="btn btn-secondary">Register</button></Link>
                </div>
            )
            }

        </header>
    )
}
