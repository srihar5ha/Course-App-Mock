
const bodyParser = require("body-parser");
const express= require("express");
const cors=require("cors");
const { findSourceMap } = require("module");

const app=express()
const port=3000

const todo=[];
app.use(cors());

app.use(bodyParser.json());

function find_todo(id){
    for(let i=0;i<todo.length;i++){
        if(todo[i]["id"]==id){
            return i
        }
    }
    return -1;
}

app.get('/todos',(req,res)=>{
    // res.send( JSON.stringify(todo));
   res.status(200).json(todo)
    console.log(todo)
})

app.get('/todos/:id',(req,res)=>{
    const id=req.params.id;
    console.log("id ",id)
    const resp=find_todo(id);
    console.log("resp ",resp)
    if(resp!=-1){

    res.status(200).json(todo[resp])
    }
    else{
        res.status(404).json("invaid id")
    }
})

app.post('/todos',(req,res)=>{
    // console.log(req.body)
    data=req.body;
    const id=Math.floor(Math.random()*100)
    const newTodo={
        id,
        title:data.title,
        description:data.description
    }
    console.log("new ",newTodo)
    todo.push(newTodo);
res.status(201).json({id:id});
})

app.put('/todos/:id',(req,res)=>{
    const id=req.params.id;
    let resp=find_todo(id);
    if(resp!=-1){
        todo[resp]["title"]=req.body.title;
        todo[resp]["description"]=req.body.description;
        res.status(200).json()
    }
    else{
        res.status(404).json()
    }
})



app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    console.log("id ",id);
    let resp=find_todo(id)
    if(resp!=-1){
     
    todo.splice(resp,1);
    res.status(200).json();   
    }
    else{
        res.status(404).json()
    }
})

app.use((req,res)=>{
    res.status(404).json({message:"route not found"})
})

app.listen(port,()=>{
    console.log("listening")
});