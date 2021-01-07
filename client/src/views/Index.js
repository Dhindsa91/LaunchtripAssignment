import React, { useState, useEffect } from 'react';
import axios from 'axios';
import store from '../redux/store';
import {useSelector, useDispatch} from 'react-redux';


export default function Index() {
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("todo");
    const [todos, setTodos] = useState([]);
    const [msg, setMsg] = useState("");
    var user = useSelector(state => state.user.user.username);
    
  
 

    const dispatch = useDispatch();

    // Get our todos on load  
    useEffect(async() => {

       await axios({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        method: 'get',
        url: `http://localhost:3001/get-posts/${user}`
      })
      .then(response => {
  
        if(response.data.ok){
          let data = response.data.docs;
          if(Array.isArray(data)) setTodos(data);
          else setTodos(todos.push(data));
          
          dispatch({type: "SET_TODO", payload: data})
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }, []);

    //Create Todo
    const handleCreateTodo = async() => {
      setMsg("");
      if(!description || !dueDate || !status) return setMsg("Please Complete All Fields");
 
     
      if(!user) setMsg("You Are Not Logged in");

      return await axios({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        method: 'post',
        url: `http://localhost:3001/create-post`,
        data: {
          description,
          dueDate,
          status,
          username: user
          
        },
      }).then(async()=>{
            // Get todos

            setDescription("");
            setDueDate("");
            setStatus("todo");

            await axios({
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
              method: 'get',
              url: `http://localhost:3001/get-posts/${user}`
            })
            .then(response => {
        
              if(response.data.ok){
                let data = response.data.docs;
                if(Array.isArray(data)) setTodos(data);
                else setTodos(todos.push(data));
                
                dispatch({type: "SET_TODO", payload: data})
              }
            })
            .catch(err=>{
              console.log(err);
            })
      }).catch(err=>{
        console.log(err);
      })

    }

    return (
          <div className="main">
            <div className="todos">
              <h1>My Todos</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-50">Description</th>
                    <th className="w-25">Due</th>
                    <th className="w-25">Status</th>
                  </tr>
                </thead>
                <tbody>
                {user ? (todos.map(todo=>{
                    return( 
                            <tr>
                            <td>{todo.description}</td>
                            <td>{todo.dueDate}</td>
                            <td>{todo.status}</td>
                            </tr> 
                          )
                        })) : ""
                  }
                </tbody>
              </table>
            </div>
            <div className="create-todo">
              <h1>Create Todo</h1>
              <form>
                <input onChange={(e)=> setDescription(e.target.value)} className="input-group mb-2" placeholder="Description" />
                <input type="date" onChange={(e)=> setDueDate(e.target.value)} className="input-group mb-2" placeholder="Due Date" />
                <select className="input-group mb-2" onChange={(e)=> setStatus(e.target.value)}>
                  <option value="todo">todo</option>
                  <option value="in-progess">in-progess</option>
                  <option value="done">done</option>
                </select> 
                <button type="button" className="btn btn-secondary" onClick={handleCreateTodo}>Create Todo</button>
              </form>
              <p>{msg}</p>
            </div>
          </div>
  
      );
}
