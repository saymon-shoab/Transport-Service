import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom'
import BgImage from '../../images/Bg.png'
import bike from '../../images/Frame.png'
import bus from '../../images/Frame-1.png'
import car from '../../images/Frame-2.png'
import train from '../../images/Group.png'

//const BackGroundImage = <img src={BgImage} alt=""/>
const Home = () => {
    return (
        <div style={{ backgroundImage:`url(${BgImage})`,width:"100%", maxHeight:"100%" }}>
            <div className="flex" >
               <div>
               <img className="size" src={bike} alt=""/>
               <button className="btn"><Link to='./pick'>Bike</Link></button>
               </div>
               <div>
                 <img className="size" src={car} alt=""/>
                  <button className="btn"><Link to='./pick'>Car</Link></button>
               </div>
              <div>
              <img className="size" src={bus} alt=""/>
              <button className="btn"><Link to='./pick'>Bus</Link></button>
              </div>
                <div>
                <img className="size" src={train} alt=""/>
                <button className="btn"><Link to='./pick'>Train</Link></button>
                </div>
                
            </div>
             <img className="back-img" src={BgImage} alt=""/> 
        </div>
    );
};

export default Home;