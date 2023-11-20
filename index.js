
// mongodb+srv://mongouser:<password>@cluster0.g6pxvkc.mongodb.net/



const express = require('express');
const mongoose=require("mongoose");
const cors=require("cors");
const adminRouter=require("./routes/admin");
const userRouter=require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.get('/',(req,res)=>res.json({msg:"hello world"}))

// Define mongoose schemas


// Connect to MongoDB
mongoose.connect('mongodb+srv://mongouser:jkHOrlW1ALnhTzsN@cluster0.g6pxvkc.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

// User routes

app.listen(3000, () => console.log('Server running on port 3000'));