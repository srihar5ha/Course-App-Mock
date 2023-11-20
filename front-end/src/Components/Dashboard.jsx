import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";



function Dashboard(){
    const [courses,setCourses]=useState("");
    
    useEffect(()=>{
       
       const fetchDashboardData=async()=>{
                const res=await fetch(
                    "http://localhost:3000/admin/courses",
                    {
                        method:"GET",
                        headers:{
                            "Content-type":'application/json',
                            "Authorization":"Bearer"+" "+localStorage.getItem("token")    
                        }
                    }
                )
                if(res.status===200){
                    const data=await res.json()
                    console.log("data dash ",data);
                    console.log("inside")
                    setCourses(data.courses);
                }
                else{
                    console.log("else in dashboard")
                }
            }
        
       fetchDashboardData();
    },[]);
    
return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
    {courses ?
     courses.map(course => { return <Course course={course} /> } )
: <p>loading...</p>
    }
</div>



    // return(
    //     <div>
    //         <h1>dashboard </h1>
    //         {
    //             courses ?  
    //            ( 
    //             <div>
    //             <h2>Course List</h2>
    //             <ul>
    //             {courses.map(course => (
    //           <li >
    //             <h3>{course.title}</h3>
    //             <p>{course.desc}</p>
    //           </li>
    //             ))}
    //          </ul>
      
    //           <Button variant="contained" onClick={handleLogOut}>Log Out</Button>
    //           </div>
    //           )
    //             :
    //             "please login "
    //         }   
           
            
    //     </div>
    // )

}

export function Course({course}) {
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        {/* <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography> */}
        <img src="" style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            {/* <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button> */}
        </div>
    </Card>

}



export default Dashboard;