import { useState,useEffect } from "react";
import Card from "@mui/material/Card";
import Alert from '@mui/material/Alert';

import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

function CreateCourse(){

    const [title,setTitle]=useState("");
    const [isCreated,setIscreated]=useState(false);
    


    const addcourse=async()=>{
        try{ 
          const res=await  fetch("http://localhost:3000/admin/courses",
          {
              method:"POST",
              body: JSON.stringify({
                title
                 }),
              headers:{
                  "Content-type":'application/json',
                  "Authorization":"Bearer"+" "+localStorage.getItem("token")    
                }
          })
          if (res.status === 201) {
              //add code to give an alert for successfull course created
              setIscreated(true);
             
          } else {
              console.error(`Unexpected HTTP status: ${res.status}`);
          }
          }
          catch(err){
          console.log("error is ",err);
          }
         
      }

    return(
        <div>
            <Card variant="outlined">
            <TextField label="title" variant="outlined" onChange={e => setTitle(e.target.value)}/>
            <br />
            <Button variant="contained" onClick={addcourse}>Add Course </Button>

            </Card>
            {isCreated ? <Alert variant="filled" severity="success">
            Successfully created!
          </Alert>
          :
          <p></p>
            
            }


        </div>
    )
}

export default CreateCourse;