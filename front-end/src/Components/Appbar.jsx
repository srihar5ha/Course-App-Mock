import { useState,useEffect } from "react";
import Typography from '@mui/material/Typography';
import  Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// import { useStateContext } from "./Context";


function AppBar(){
    const [userEmail,setUserEmail]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
            const fetchUser=async()=>{          
                const res=await fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data= await res.json()
        if(data.username){
            setUserEmail(data.username)
        }    
    }
    fetchUser();
    },[]);

    if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10}}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10, display: "flex"}}>
                <div style={{marginRight: 10}}>
                        <Button variant={"contained"}
                            onClick={() => {
                                navigate("/createcourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div style={{marginRight: 10}}>
                        <Button variant={"contained"}
                            onClick={() => {
                                navigate("/dashboard")
                            }}
                        >Courses</Button>
                    </div>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    }
else{
    return (
        <div style={{
            display:"flex",
            justifyContent: "space-between",
            padding:4
        }}>
          <div style={{marginLeft: 10}}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
    <div>
    <Button variant="contained" onClick={()=>{
        navigate('/signup');
}}>Sign Up</Button>
    
    <Button variant="contained" onClick={()=>{
        navigate('/login');
}}>Login</Button>
    
    
    </div>
    </div>
    
        );
}
    
}



export default AppBar;