import React from "react";
import './home.css'
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { TbWorld } from "react-icons/tb";
import { FaBookReader } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { SiAppwrite } from "react-icons/si";
export default function Home(){
    const navigate = useNavigate();


    return(
        <div>
            <div className="image--container">
                
                <div className="image--text">
                    <h2>Welcome to <br /> Learners Corner</h2>
        
                    <p className="l-home-quote">An investment in knowledge pays the best interest. 
                     </p>
                     <strong>Benjamin Franklin </strong>
                     
                    <NavLink to='/learners-corner/about' className="image--button">About Us</NavLink>
                </div>


                <div className="image--overlay"></div>
        
           </div>

           <br />
           <div className="text--container">

                <div className="join--us">
                    <TbWorld className="l-world-icon"/>
                    <h2>The World Of <br /> Online Learning</h2>
                    <p><strong>What you can find interesting</strong></p>
                </div>

                <div className="card--container">

                    <div className="card ">
                         
                        <div className="title--containers">
                            <div className="l-service-icon-container">
                                <FaBookReader onClick={()=>{navigate('/learners-corner/online/subjects')}} className="l-service-icon"/>
                            </div>

                            <div className="l-service-text">
                                <NavLink className={'l-service-name'} to={'/learners-corner/online/subjects'}>Lessons</NavLink>
                                <p className="l-service-description">Our curriculum opens a window to uncountable subjects of study</p>
                            </div>
                            
                        </div>
                
                    </div>

                    <div className="card ">
                        
                        <div className="title--containers">
                            <div className="l-service-icon-container">
                                <MdQuiz onClick={()=>{navigate('/learners-corner/online/subjects')}} className="l-service-icon"/>
                            </div>


                            <div className="l-service-text">
                                <NavLink className={'l-service-name'} to={'/learners-corner/online/subjects'}>Quiz</NavLink>
                                <p className="l-service-description">You don't have to look somewhere else, we h've got Quizzes for you.</p>
                            </div>
                            
                        </div>
                   
                    </div>

                    <div className="card ">
                       
                        <div className="title--containers">
                            <div className="l-service-icon-container">
                                <SiAppwrite onClick={()=>{navigate('/learners-corner/online/create')}} className="l-service-icon"/>
                            </div>

                            <div className="l-service-text">
                                <NavLink className={'l-service-name'} to={'/learners-corner/online/create'}>Content Creation</NavLink>
                                <p>if you are a teacher this is where you are going to spend most of your time creating content for your students</p>
                            </div>
                            
                        </div>              
                    </div>

                </div>

                <div className="join--us">
                    <h2>Join Our <br /> Community</h2>
                    <button className="join--btn">Join</button>
                </div>
             


           </div>


          <Footer/>
        
        </div>
      

    )
}