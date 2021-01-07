import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';


export default function Index() {
    var [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("todo");
    const [todos, setTodos] = useState([]);
    const [msg, setMsg] = useState("");
    var user = useSelector(state => state.user.user.username);

    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const statusRef = useRef();

    
    const clearState = () => {
      console.log("clearing state...");
      setDescription("");
      setDueDate("");
      setStatus("todo");
      descriptionRef.current.value = "";
      dueDateRef.current.value = "";
      statusRef.current.value = "todo";
    }
  
 
    const dispatch = useDispatch();

    // Get our todos on load  
    useEffect(() => {
      axios({
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
    const handleCreateTodo = async(e) => {
      e.preventDefault();
      setMsg("");
      if(!description || !dueDate || !status) return setMsg("Please Complete All Fields");
 
     
      if(!user) return setMsg("You Are Not Logged in");

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

      }).then(()=>{
            // Get todos
            clearState();
            axios({
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
                <input  ref={descriptionRef} onChange={(e)=> setDescription(e.target.value)} className="input-group mb-2" placeholder="Description" />
                <input  ref={dueDateRef} type="date" onChange={(e)=> setDueDate(e.target.value)} className="input-group mb-2" placeholder="Due Date" />
                <select ref={statusRef} className="input-group mb-2" onChange={(e)=> setStatus(e.target.value)}>
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
