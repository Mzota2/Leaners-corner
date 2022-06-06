import React from "react";
import '../contact.css'
import assistImage from '../images/assist.jpg'

export default function Contact(props){
    return(
        <div>
            <div className="contact--title--container">
                <h3 className="contact--title">Contact Us</h3>

            </div>
            
            <div className="contact--assist--container"> 
                <div className="contact--assist--text">
                    <div>
                        <h3 className="contact--text1">We Are Here To <br/> Assist You With<br/> Your Education</h3>
                        <hr className="hr
                        "></hr>
                    </div>
                   
                    <div className="social--icons">
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram-square"></i>
                        <i class="fab fa-youtube"></i>

                    </div>
                </div>

                <div>
                    <img className="assistImage" src={assistImage} alt="Image" />
                </div>

            </div>

            <div className="contact--more">
                <div className="contact--more--info">
                    <hr className="line--info"></hr>
                    <h4>Feel Free To Contact Us <br/>For More Information.</h4>
                    <button className="contact--info--button">Contact Now <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
            <div className="where--container">
                <div className="where--header">
                    <hr className="hr"/>
                    <h3>Where You Can Find Us</h3>
                </div>
                
                <div className="where--info">
                <div className="info--">
                    <h4><i class="fas fa-phone-alt"></i> Phone Number</h4>
                    <p>09999787979</p>
                </div>

                <div className="info--">
                    <h4><i class="fas fa-address-card"></i> Our Address</h4>
                    <p>MzotaTech House</p>
                </div>

                <div className="info--">
                    <h4><i class="fas fa-envelope"></i> Our Email</h4>
                    <p>emzota@gmail.com</p>
                </div>

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
                
            <hr></hr>
            </div>
          
           
        </div>
    )
}