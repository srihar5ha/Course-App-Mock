// Context.js
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [username, setUsername] = useState('ulala');
  const [password, setPassword] = useState('palal');

  const handleSignup=async(username,password)=>{
    console.log("called")
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
        const data=await res.json()
    console.log("data is ",data);
    setIsReg(true);
    }
    
}
  return (
    <StateContext.Provider
      value={{
        username,
        password,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => {
  return useContext(StateContext);
};

export { StateProvider, useStateContext };
