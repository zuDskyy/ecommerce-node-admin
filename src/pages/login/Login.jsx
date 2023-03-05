import React from "react";
import "./login.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import {useNavigate} from 'react-router-dom'
// import {login} from '../../requestMethods'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    login({ username, password }, dispatch );
    if(login !== ""){
    navigate('/');
    }

  };
  useEffect(() => {}, []);
  return (
    <div
      style={{
        height: "100vh",
        flexDirection:"column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="login"
    >
      <input style={{padding:10, marginBottom:20}} 
        type="text"
        name=""
        id="username"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input style={{padding:10, marginBottom:20}}
        type="password"
        name=""
        id="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
     
      <button onClick={handleClick} style={{paddin:10, width: 100}}>Login</button>
    </div>
  );
};

export default Login;
