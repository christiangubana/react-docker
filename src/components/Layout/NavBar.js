import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Logo from '../../assets/f1-logo.png';
import './NavBar.css';

export default function NavBar () {
return (
<div>  
   <nav className="navbar navbar-default navbar-static-top">
    <ul className="nav nav-pills">
      <li><Link to="/" className='logo'><img src={Logo} alt="f1-logo"></img> </Link> </li>
      <li className='button-header'><Button variant="contained" disabled>F1 champions starting from 2005 until now</Button></li>
      {/* <li><Link to="/" className="active">Home</Link></li> */}
    </ul>
   </nav> 
  </div>    
      
    );
  }