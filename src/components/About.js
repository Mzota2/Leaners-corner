import React from "react";
import '../about.css'
import aboutImage from '../images/aboutImage.png'
import founder from '../images/founder.png'
import { NavLink } from "react-router-dom";

export default function About(props){
    return(
        <div>
            <div className="about--title--container">
                <h3 className="about--title">Learn About Us</h3>
            </div>
             
            <div className="about--level--1">
            <div className="about--level11">
                <div>
                    <h3 className="happy--text">We Are Happy <br/> To Educate You</h3>
                    <hr className="hr"/>
                </div>
                <div className="about--icons">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-instagram-square"></i>
                    <i class="fab fa-youtube"></i>
                </div>

            </div>

            <div className="ab--aboutImage">
                <img className="ab--aboutImage--context" src={aboutImage} alt="Image"></img>
            </div>
            </div>

            <div className="offer--container">
                <div className="offer--container2">
                    <h3 className="offer--title">Our Offers</h3>
                </div>
                
                <div className="ab--container">
                    <div className="offered--container3">
                        <h4 className="quiz--title">Quizes.</h4>
                        <h4 className="quiz--title">Online Classes.</h4>
                        <hr className="hr"/>
                        <div className="offered--subjects">
                            <p className="subject1">Social</p>
                            <p className="subject1">English</p>
                            <p className="subject1">Biology</p>
                            <p className="subject1">History</p>
                            <p className="subject1">Physics</p>
                            <p className="subject1">Computer</p>
                            <p className="subject1">Chemistry</p>
                            <p className="subject1">Geography</p>
                            <p className="subject1">Agriculture</p>
                            <p className="subject1">Bible Knowledge</p>
                            <p className="subject1">Mathematics</p>
                            <p className="subject1">Additional Mathematics</p>
                        </div>
                        <div  className="offer--container">
                            <NavLink to='/sign' className="see--curriculum">More <i class=" fab fas fa-angle-double-right"></i></NavLink>
                        </div>
                       
                    </div>
                </div>

            </div>

            <div className="founder--container">
                <div className="founder--info">
                    <h3 className="founder--text">MEET THE FOUNDER</h3>
                    <p className="founder--name">Emmanuel Mzota</p>
                    <hr className="hr"/>
                    <p className="founder--say">Am a Proud <b>Web Developer</b> and <b>Designer.</b> <br/>This website aims at promoting E-Learning.<br/>This is through onlice classes and quizes.<br/>This is for both primary and secondary school.<br/><b>EDUCATION THE KEY TO SUCCESS.</b></p>
                </div>

                <div>
                    <img className="ab--founderImages founderImage" src={founder} alt="Image"></img>
                </div>

            </div>
            <hr style={{marginTop:20}} className="footer--line" />

            <div className="footer--container">
                
                <h3 className="footer--title">Learners corner.</h3>
                <div className="footer--bottom">
                    <p className="copy">© 2022 Mzota . All rights reserved</p>
                    <div className="social--icons">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-instagram-square"></i>
                    <i class="fab fa-youtube"></i>
                </div>

                </div>
                

            </div>
            
      
        </div>
    )
}