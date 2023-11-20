import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import AppBar from './Components/Appbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import CreateCourse from './Components/CreateCourse'
// import {StateProvider} from './Components/Context'

function App() {
  
  return (
    <div > 

    <Router>
    <AppBar/>    
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
         <Route path='/login' element={<Login/>}/> 
         <Route path='/dashboard' element={<Dashboard/>}/> 
         <Route path='/createcourse' element={<CreateCourse/>}/> 
         

      </Routes>
    </Router>
    
       </div>
   
  )
}

export default App
