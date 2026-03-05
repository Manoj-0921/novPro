import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css';

function Home() {
return (
  <div className="home-container">
    <div className="home-content">
      <h1>Welcome</h1>
      <p>This is the home page of our application. Please choose an option below to get started.</p>
      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup-customer"><button>Sign Up as Customer</button></Link>
        <Link to="/signup-retailer"><button>Sign Up as Retailer</button></Link>
      </div>
    </div>
  </div>
)
}

export default Home