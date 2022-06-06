import React from "react";
import'../curriculum.css'
import {NavLink} from 'react-router-dom';

export default function Sign(props){
    //using state for conditional rendering
    const [isPrimary, setIsPrimary] = React.useState(true);
    
    function handleSwitch(){
        setIsPrimary(!isPrimary);
    }
    return(
        <div>
            <div className="curriculumT">
                
            </div>
         
           <div className="cu--level--container">
               <div className="quoteNavLink">
              
               {isPrimary?<h3 onClick={handleSwitch} className=" primaryT cu--level--title">Primary School <i class="fan fas fa-arrow-right"></i></h3>:console.log('nothing')}
               {isPrimary?<p className="quote">“Education is the most powerful weapon which you can use to change the world.”<br/><span className="nameN">-Nelson Mandela</span></p>:console.log('nothing')}
               </div>
               
               {isPrimary?<div className=" primary cu--subject--container">
                   <NavLink className="cu--subject--btn" to='/agriQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Agriculture</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/socialQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Social Studies</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/englishQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">English</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/chichewaQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Chichewa</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/artQuiz' ><i class="fasd fas fa-book"></i>  <p className="sb--text">Expressive Arts</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/lifeQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Life Skills</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/bkQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Bible Knowledge</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/mathematicsQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Mathematics</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/frenchQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">French</p></NavLink>
                   <NavLink className="cu--subject--btn"  to='/scienceQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Primary Science</p></NavLink>
               </div>: console.log('nothing')}

           </div>
           
           <div className="secondary cu--level--container">
               <div className="quoteNavLink">
                    { isPrimary?console.log('we'):<h3 onClick={handleSwitch} className=" secondayT cu--level--title">Secondary School <i class=" fan fas fa-arrow-right"></i></h3>}
                    {isPrimary?console.log('we'):<p className="quote">“Education is the most powerful weapon which you can use to change the world.”<br/><span className="nameN">-Nelson Mandela</span></p>}
               </div>
               {isPrimary?console.log('its prime'):<div className=" secondary cu--subject--container">
                   <NavLink  className="cu--subject--btn"  to='/bioQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Biology</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/chemistryQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Chemistry</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/agriQuiz' ><i class="fasd fas  fa-book"></i><p className="sb--text">Agriculture</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/physicsQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Physics</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/history'><i class="fasd fas fa-book"></i><p className="sb--text">History</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/mathematicsQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Mathematics</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/admaQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Additional Mathematics</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/computerQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Computer Studies</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/socialQuiz'><i class="fasd fas fa-book"></i><p className="sb--text">Social Studies</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/frenchQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">French</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/englishQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">English</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/chichewaQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Chichewa</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/lifeQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Life Skills</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/bkQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Bible Knowledge</p></NavLink>
                   <NavLink className="cu--subject--btn" to='/businessQuiz' ><i class="fasd fas fa-book"></i><p className="sb--text">Business Studies</p></NavLink>
               </div>}
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