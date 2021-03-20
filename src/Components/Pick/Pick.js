import React from 'react';
import './Pick.css'
 import map from '../../images/Map.png'
import { Link } from 'react-router-dom';
const Pick = () => {
    return (
        <div className="flex">
            <div className="pick-size ">
                <div className="cart">
                <p>pick From</p>
                 <input type="text" />
                 <p>Pick To</p>
                 <input type="text"/>
                 <br/>
                 <button className="btn-color"><Link to="./destination">Search</Link></button>
                 
                </div>
                
            </div>
            <div className="map-size">
               <img src={map} alt=""/>
            </div>
        </div>
    );
};

export default Pick;