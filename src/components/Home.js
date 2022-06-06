import React from "react";
import schoolImage from '../images/school.jpeg'
import '../home.css'
import { NavLink } from "react-router-dom";

export default function Home(props){


    return(
        <div>
            <div className="image--container">
                <div className="image--text">
                    <h3>Welcome To Leaners Corner</h3>
                    <h4>Education The Backbone <br/> Of The Country </h4><br/>
                    <NavLink to='/about' className="image--button">About Us</NavLink>
                </div>
        
           </div>
           <div className="text--container">
               <div>
                    <div className="school--container">
                    
                    </div>
               </div>
                <div className="card">
                    <div className="level--container">
                         
                        <div className="title--containers">
                            <div className="profile--icon education"></div>
                            <NavLink className='link' to='/sign'><h3>Education Level</h3></NavLink>
                            <p>We offer Quizes</p>
                        </div>
                
                        <div className="button--container">
                            <NavLink to='/sign' className="button--see">See More</NavLink>
                        </div>
                    </div>

                    <div className="subjects--container ">
                        
                        <div className="title--containers">
                            <div className="profile--icon subject"></div> 
                            <NavLink className='link' to='/sign'><h3>Subjects Offered</h3></NavLink>
                            <p>Many Subjects Available</p>
                        </div>
                   
                        <div className="button--container">
                            <NavLink to='/sign' className="button--see">See More</NavLink>
                        </div>
                    </div>

                    <div className="online--container ">
                       
                        <div className="title--containers">
                            <div className="profile--icon online"></div>
                            <NavLink className='link' to='/online'><h3>Online Leaning</h3></NavLink> 
                            
                            <p>We offer online classes</p>
                        </div>
                    
                        <div className="button--container">
                            <NavLink to='/online' className="button--see">See More</NavLink>
                        </div>
                  
                    </div>

                </div>
             


           </div>

        </div>
      

    )
}