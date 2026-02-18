
import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './Login';
const { useState } = React;
import axios from 'axios';
function Sigin() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
const handlechange=(e)=>{
  setFormData({
    ...formData,
  [e.target.name]:e.target.value
  })
}

const handleLogin = async (e) => {
  console.log("Form Data:", formData);
  try{
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
   
  const reposnse= await axios.post("http://localhost:4000/api/register",{
    username:formData.username,
    password:formData.password
  },{
    headers:{
      'Content-Type':'application/json'
    } 
  }
  );
  if(reposnse.status===201){
    alert("signup successful");
    navigate("/");
  }   


}
catch(error){
  console.error("There was an error!",error);
}

  console.log(reposnse.data); 
}
  return (
    <div className="main">
      <form className="main1" onSubmit={handleLogin}>
        <h1 className="header"> siginup form</h1>
        <div className="main2">
          <input type="text" name="username" 
          onChange={handlechange}
          value={formData.username}
          placeholder="enter ur name" />
          <input
            type="password"
            name="password"
            onChange={handlechange}  
            value={formData.password}
            placeholder="enter ur password "
          />
          <button type="submit"> Submit </button>
          <p>
            if have already account <Link to="/">Login</Link>{" "}
          </p>
        </div>
      </form>
      <br />
    </div>
  );
}

export default Sigin;