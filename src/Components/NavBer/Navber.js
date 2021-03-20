import React from 'react';
import './Navber.css'
import { Link } from 'react-router-dom'


const Navber = () => {
    return (
        <div className="header">
            <nav className="nav">
               <ul>
                   <li>
                       <span className="title"> Transport Service</span>
                   </li>
                   <li>
                      <Link className="color" to="/home">HOME</Link>
                   </li>
                  
                   <li>
                      <Link className="color" to="/pick">PICK</Link>
                   </li>
                   <li>
                      <Link className="color" to="/destination">DESTINATION</Link>
                   </li>
                   <li>
                   <Link className="color" to="/login">LOG IN</Link>
                   </li>
                   
               </ul>
            </nav>
        </div>
    );
};

export default Navber;