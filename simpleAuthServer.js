const express = require("express")
const cors=require("cors")
const bodyParser=require("body-parser");
const PORT = 3000;

const app = express();


const user_data=[];
const userNames=[];

app.use(cors())
app.use(bodyParser.json());


function verify_creds(data){
    const index=user_data.findIndex(item=>item.username ===data.username)
    if(index!=-1){
        if(user_data[index]["password"]===data.password){
           return 1;
        }
    }
    else{
        return 0;
    }
}


app.get('/',(req,res)=>{
    res.status(200).json(user_data)
})


app.get('/data',(req,res)=>{
    const headers=req.headers;
    if(verify_creds(headers)){
        res.status(200).json(user_data);
    }
    else{
        res.status(401).json("unauthorised.")
    }
    


    res.status(200).json(user_data)
})


app.post('/signup',(req,res)=>{
    const data=req.body;
    console.log("data is ",data)
    
    const newUser={
        username: data.username,
        password:data.password,
        name:data.name
    }
    console.log("new ",newUser)
    if(!userNames.includes(newUser.username )){

    user_data.push(newUser);
    userNames.push(newUser.username);
    res.status(201).json({message:"created"});
    }
    else{
        res.status(400).json("Username exists")
    }
})

app.post('/login',(req,res)=>{
    const data=req.body;
    if(verify_creds(data)){
        res.status(200).json("token");
    }
    else{
        res.status(401).json("unauthorised")
    }


})


app.listen(PORT,()=>{
    console.log("listening")
});


module.exports = app;