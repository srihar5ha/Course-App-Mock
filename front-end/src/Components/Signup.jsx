import { useState} from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import Alert from '@mui/material/Alert';

function Signup(){


const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [isReg,setIsReg]=useState(false);
const [msg,setMsg]=useState("");
    
const handleSignup=async()=>{
       const res=await  fetch("http://localhost:3000/admin/signup",
        {
            method:"POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers:{
                "Content-type":'application/json'
            }
        })
        if(res.status=== 201){
        setIsReg(true);
        }
        const data=await res.json()
        console.log("data is ",data);
        setMsg(data.message)
        setUsername("");
        setPassword("");
        
        
    }
    

   
    return <div >
        
        <Card variant="outlined">
            
        <h1>Signup</h1>
        <TextField label="username" value={username} variant="outlined" onChange={e => setUsername(e.target.value)}/>

        {/* {console.log("email is",email)} */}
        <br />
<TextField  label="password" value={password}  variant="outlined"  onChange={e => setPassword(e.target.value)}/>
        <br />
         <Button variant="contained" onClick={handleSignup}>Sign up </Button>
          { msg?
            <Alert variant="filled" severity="success">
           {msg}
          </Alert>
          :
          <p></p>
            }
         </Card>
    </div>
}


export default Signup;