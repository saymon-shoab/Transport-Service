import React from 'react';
import './Destination.css'
 import map from '../../images/Map.png'

const Destination = () => {
    return (
        <div className="flex">
            <div className="Des-size">
              <h1>Destination Loading</h1>
            </div>
            <div className="map-size">
                <img src={map} alt=""/>
            </div>
        </div>
    );
};

export default Destination;