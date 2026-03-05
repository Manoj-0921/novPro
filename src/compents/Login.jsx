import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';


function Login() {
  const navigate=useNavigate();
const [formData, setFormData] = useState({
    username: '',
    password: ''
  });


const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
}
const fetchUserRole=async()=>{
  try{
    const response =await axios.get('http://localhost:4000/api/userdetials',{
      withCredentials:true
    })
    if(response.status===200){
      console.log("User Role:", response.data.role);
      return { role: response.data.role, username: response.data.username };
    }
    else{
      return null;
    }
  }
  catch(error){
    console.error("Error fetching user role:", error);
    return null;      
    }
  }
  

const handleLogin = async(e) => {
  console.log("Form Data:", formData);
 try{
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Form Data:", formData);
    const token=localStorage.getItem("token");
   
const response = await axios.post(
  "http://localhost:4000/api/Login",
  {
    username: formData.username,
    password: formData.password
  },
  {
    withCredentials: true // ✅ VERY IMPORTANT
  }
);

  if(response.status===200){
  
    // const username=response.data.username;
    // const role=response.data.role;

    // console.log("Login successful:", username);
    // localStorage.setItem("username", username);
    // localStorage.setItem("role", role);
    // alert("Login successful");
    const userdetials= await fetchUserRole();
    console.log("User Details:", userdetials);

  
    if(userdetials.role === "customer") {
      navigate("/customer");
    } else if(userdetials.role === "retailer") {
      navigate("/retailer");
    } else {
      navigate("/");
    }
  }   


}
catch(error){
 if(error.response.status===404){
  alert("User not found");
 }
 else if(error.response.status===401){
  alert("Invalid credentials");
 }
 else{
  alert("Login failed");
 }
}


}


  return (
    <>
      <div className="main">
        <form className="main1" onSubmit={handleLogin}>
          <h1 className="header">Login form</h1>

          <div className="main2">
            <input type="text" name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="enter your name" />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="enter your password"
            
            />

            <button type="submit">Submit</button>
            <Link to="/forgotpassword">Forgot Password</Link>

            <p>
              If you don't have an account, please sign up{" "}
              <Link to="/signup">Signup</Link>
            </p>
         
           
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
