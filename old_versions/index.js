const express = require('express');
const app = express();
const cors=require("cors");


app.use(express.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];


const adminAuth=(req,res,next)=>{
    const {username,password}=req.headers;
    const admin=ADMINS.find(a=> a.username===username && a.password===password);
    if(admin){
        next();

    }else{
        res.status(403).json({ message: 'Admin authentication failed' });
    }
}

const userAuth=(req,res,next)=>{
    const {username,password}=req.headers;
    const user=USERS.find(a=> a.username===username && a.password===password);
    if(user){
        next();

    }else{
        res.status(403).json({ message: 'user authentication failed' });
    }
}




// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin=req.body;
  const existingAdmin = ADMINS.find(a => a.username === admin.username);
    if(existingAdmin){
        res.status(403).json({ message: 'Admin already exists' });
    } else {
      ADMINS.push(admin);
      res.json({ message: 'Admin created successfully' });
    }
});

app.post('/admin/login', adminAuth, (req, res) => {

    res.json({message: "logged in successfully"});

});

app.post('/admin/courses', adminAuth, (req, res) => {
    const course = req.body;
  
    course.id = Date.now(); // use timestamp as course ID
    course.published=true;
    COURSES.push(course);
    res.json({ message: 'Course created successfully', courseId: course.id });
  });
  
  app.put('/admin/courses/:courseId', adminAuth, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      Object.assign(course, req.body);
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  app.get('/admin/courses', adminAuth, (req, res) => {
    res.json({ courses: COURSES });
  });


app.get('/data',(req, res) => {
    // logic to get all data
    const resp={
        "admins":ADMINS,
        "users":USERS,
        "courses":COURSES
    }
    res.json(resp)
  })


// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up
//   const user={...req.body,purchasedCourses:[]}
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: []
  }
  const existingUser = USERS.find(a => a.username === user.username);
    if(existingUser){
        res.status(400).json("username already exists")
   
    }
    else{
        USERS.push(user);
        res.status(201).json({message:"user created"});
        
    }
});

app.post('/users/login', userAuth, (req, res) => {
  // logic to log in user
  res.json({message: "logged in successfully"});

});

app.get('/users/courses', userAuth, (req, res) => {
    // COURSES.filter(c => c.published)
    let filteredCourses = [];
    for (let i = 0; i<COURSES.length; i++) {
      if (COURSES[i].published) {
        filteredCourses.push(COURSES[i]);
      }
    }
    res.json({ courses: filteredCourses });
  });
  
  app.post('/users/courses/:courseId', userAuth, (req, res) => {
    const courseId = Number(req.params.courseId);
    const course = COURSES.find(c => c.id === courseId && c.published);
    if (course) {
      username=req.headers.username ;
      const user=USERS.find(a => a.username === username);
      user.purchasedCourses.push(courseId);
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(404).json({ message: 'Course not found or not available' });
    }
  });
  
  app.get('/users/purchasedCourses', userAuth, (req, res) => {
    // const purchasedCourses = COURSES.filter(c => user.purchasedCourses.includes(c.id));
    // We need to extract the complete course object from COURSES
    // which have ids which are present in user.purchasedCourses
    const username=req.headers.username ;
    const user=USERS.find(a => a.username === username);
      
    var purchasedCourseIds = user.purchasedCourses;
    var purchasedCourses = [];
    for (let i = 0; i<COURSES.length; i++) {
      if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
        purchasedCourses.push(COURSES[i]);
      }
    }
  
    res.json({ purchasedCourses });
  });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});