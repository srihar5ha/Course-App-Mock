import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";

import { useNavigate } from "react-router-dom";


function Login(){

    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [token,setToken]=useState();


    const handleLogin=async()=>{
      try{ 
        const res=await  fetch("http://localhost:3000/admin/login",
        {
            method:"POST",
            body: JSON.stringify({
               }),
            headers:{
                "Content-type":'application/json',
                "username":username,
                "password":password
            }
        })
        if (res.status === 200) {
            const data = await res.json();
            localStorage.setItem("token",data["token"]);
            // console.log(localStorage.getItem("token"));
         setToken(data["token"]);
        window.location="/"
           
        } else {
            console.error(`Unexpected HTTP status: ${res.status}`);
        }
        }
        catch(err){
        console.log("error is ",err);
    }
       
    }
   


    return <div>
        <h1>Login</h1>
        <Card variant="outlined">
        <TextField  label="username" variant="outlined" onChange={e => setUsername(e.target.value)}/>
            <br />
    <TextField  label="password" variant="outlined" onChange={e => setPassword(e.target.value)}/>
            <br />
             <Button variant="contained" onClick={handleLogin}>Log In</Button>
             </Card>
       
    </div>
}


export default Login;