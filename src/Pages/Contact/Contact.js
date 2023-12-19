import React from "react";
import './contact.css'
import assistImage from '../../Assets/assist.jpg';
import Footer from '../../components/Footer/Footer';

export default function Contact(props){
    return(
        <div className="ac--container">

            <div className="section--container">

            

            <div className="contact--assist--container"> 
                <div className="about--level11">
                    <h3 className="about--title">Get In Touch.</h3>
                    
                    <div>
                        <h3 className="happy--text">We are Here to Assist You With
                         Your Education</h3>

                    </div>
                   
                    <div className="about--icons">
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram-square"></i>
                        <i class="fab fa-youtube"></i>

                    </div>

                </div>


                <div className="ab--aboutImage">
                    <img className="assistImage" src={assistImage} alt="" />
                </div>

            </div>


            <div className="offer-main-container">
                <div id="contact" className="where--container">

                <div className="offer-title-container">
                    <h3 className="offer-title">How to Find Us</h3>
                    <hr className="section-title-line"/>
                </div>


                

                <form className="sign-form contact-sign-form">
    
                    <div className="row">
                            <label htmlFor="name">Name</label>
                            <input type="name" id='name' className='lc-input'  />
                    </div>

                    <div className="row">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' className='lc-input'  />
                    </div>

                    <div className="row">
                        <label htmlFor="message">Message</label>
                        <textarea  cols={10} rows={5} id='message' name='message'  type="text" className='c-description-input' />
                    </div>

                    <button className="l-btn l-contact-btn">Submit</button>


                </form>

                <div className="where--info">
                    <div className="info">
                        <i class="fas fa-phone-alt"></i>
                        <p>09999787979</p>
                    </div>

                    <div className="info">
                        <i class="fas fa-address-card"></i>
                        <p>MTech House</p>
                    </div>

                    <div className="info">
                        <i class="fas fa-envelope"></i>
                        <p>emzota@gmail.com</p>
                    </div>

                </div>

                </div> 
            </div>
            

            </div>

            <Footer/>
          
           
        </div>
    )
}