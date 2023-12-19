import React from "react";
import './about.css'
import founder from '../../Assets/teacher.jpg'
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import {getSubjects} from '../../state/subjectsSlice';
import leadersImage from '../../Assets/leaders.jpg';

export default function About(props){
    const subjects = useSelector(state => state.subjects.data);
    const status = useSelector(state => state.subjects.status);

    const dispatch = useDispatch();

    React.useEffect(()=>{
        if(status === 'idle'){
            dispatch(getSubjects());
        }
    }, [dispatch, status, subjects])

    return(
        <div>
            <div className="section--container">

                <div className="about--title--container">
                    <h3 className="about--title">Learn <br /> About Us.</h3>
                    <hr className="section-title-line" />
                </div>

                
                
                <div className="about--level--1">
                    <div className="about--level11">

                        <div>
                            <h3 className="happy--text">Educating the Next Generation of Leaders</h3>
                        </div>
                        
                        <div className="about--icons">
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-instagram-square"></i>
                            <i class="fab fa-youtube"></i>
                        </div>

                    </div>

                    <div className="ab--aboutImage">
                        <img className="ab--aboutImage--context" src={leadersImage} alt="students"></img>
                    </div>

                </div>
                <div className="offer-main-container">
                    <div className="offer--container">
                        <div className="offer-title-container">
                            <h3 className="offer-title">WHAT ? <br /> you can learn</h3>
                            <hr className="section-title-line" />
                        </div>
                        {
                         
                        }
                        
                        <div className="ab--container"> 

                            <div className="offered--subjects">
                                {subjects?.slice(0, 11)?.map(subject =>{
                                    return(
                                        <p key={subject?._id} className="subject1">{subject.title}</p>
                                    )
                                })}
                            
                            </div>
                            
                            
                        </div>

                        <NavLink to='/learners-corner/curriculum' className="l-curriculum-btn"> View Our Curriculum </NavLink>
                        
            

                    </div>
                </div>
                

                
                <div className="founder-info">
                    <h3 className="founder-text">MEET THE FOUNDER</h3>

                    <div className="founderImage-container">
                        <img className="founderImage" src={founder} alt="founder"></img>
                    </div>

                    <p><strong className="founder-name">Blessings Pensulo</strong></p>
                    
                    <p className="founder-say">
                        I'm passionate teacher with over 10 years of experience in teaching in primary and secondary school. I love teaching, that is why i created this website to provide
                        an opportunity to other teachers and a pool of knowledge to all students around the world.
                    </p>
                </div>
                

        </div>
        <Footer/>
        </div>
    )
}