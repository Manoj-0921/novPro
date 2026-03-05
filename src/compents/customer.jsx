import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function customer() {
  const [uniqueId, setUniqueId] = useState(null);
  const username=localStorage.getItem("username");
    const navigate=useNavigate();
 const handleLogout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/Logout",
      {},
      {
        withCredentials: true
      }
    );
    
    console.log(response.data); // shows real output

    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

const generateUnquieId=async()=>{
 try {
    const response = await axios.get("http://localhost:4000/api/generateUniqueId", {
      withCredentials: true
    });
    if (response.status === 200) {
      setUniqueId(response.data.uniqueId);
      console.log("Generated Unique ID:", response.data.uniqueId);
    }
  } catch (error) {
    if(error.response.status===401){
  const reposne =await axios.post("http://localhost:4000/api/refreshToken", {},
    {
      withCredentials:true
    }
  )
  if(reposne.status===200){
    generateUnquieId();
  }
  
    }

    console.error("Error generating Unique ID:", error);
  }
}
  
  
  return (
   <div className="dashboard">
    <div className="dashboard-container">
      <h1>Welcome, {username}!</h1>
      <p>Customer Dashboard</p>

      {uniqueId && <p>Your Unique ID: <strong>{uniqueId}</strong></p>}
      <div className="dashboard-buttons">
        <button onClick={generateUnquieId}>Generate Unique ID</button>
        <button onClick={handleLogout} style={{backgroundColor: '#e74c3c'}}>Logout</button>
      </div>
    </div>
   </div>
  )
}

export default customer
