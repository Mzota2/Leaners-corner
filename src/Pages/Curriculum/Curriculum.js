import React from "react";
import'./curriculum.css'
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getSubjects, selectAllSubjects, selectSubjectStatus } from "../../state/subjectsSlice";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
export default function Curriculum(){

    const dispatch = useDispatch();

    // const status = useSelector(state => state.subjects.status);
    const status = useSelector(state => selectSubjectStatus(state.subjects));
    const subjects = useSelector(state=> selectAllSubjects(state.subjects));
    const primarySubjects = subjects.filter(subject => (subject.form === 'Standard 5' )|| (subject.form === 'Standard 6' )|| (subject.form === 'Standard 7') || (subject.form === 'Standard 8'));
    const secondarySubjects = subjects.filter(subject => (subject.form === 'Form 1') ||  (subject.form === 'Form 2') || (subject.form === 'Form 3') || (subject.form === 'Form 4'));

    
    const [isLoading, setIsLoading] = React.useState(true);
    //using state for conditional rendering
    const [isPrimary, setIsPrimary] = React.useState(true);
    
    function handleSecondary(){
        setIsPrimary(false);
    }

    function handlePrimary(){
        setIsPrimary(true)
    }

    React.useEffect(()=>{
        if(status === 'idle'){
            console.log('idle')
            setIsLoading(true);
            dispatch(getSubjects())
        }else{
            setIsLoading(false)
        }
        
    }, [status, dispatch])

    if(status ==='idle'){
        return <Loader/>
    }
    return(
        <div>
            <div className="curriculumT">
                
            </div>
         
           <div className="cu--level--container">
               <div className="quoteNavLink">
              
                <div className="cu--tabs">
                    <button className=" l-btn l-btn-primary" onClick={handlePrimary}>Primary</button>
                    <button className=" l-btn l-btn-secondary" onClick={handleSecondary}>Secondary</button>
                </div>

               <p className="quote">“Education is the most powerful weapon which you can use to change the world.”<br/><span className="nameN">-Nelson Mandela</span></p>
               </div>

            

                
                        {
                        isPrimary? primarySubjects?.map((subject)=>{
                            const {title, form} = subject;
                        return(
                            <div className="primary cu--subject--container">

                            <NavLink key={subject._id} className="cu--subject--btn" to={`/learners-corner/online/lesson/${subject._id}`}><i class="fasd fas fa-book"></i><p className="sb--text">{title} {form}</p></NavLink>
                            </div>
                        )

                        }):<div className="secondary cu--subject--container"> {secondarySubjects?.map((subject)=>{
                            const {title, form} = subject;
                            return(
                                

                                 <NavLink key={subject._id} className="cu--subject--btn" to={`/learners-corner/online/lesson/${subject._id}`}><i class="fasd fas fa-book"></i><p className="sb--text">{title} {form}</p></NavLink>
                                
                            )
                        })}

                        </div>
                    }
                

           </div>
    
           <Footer/>
        </div>
    )
}