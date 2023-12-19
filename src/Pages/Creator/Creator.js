import React, { useRef } from 'react'
import creatorImage from '../../Assets/creator.jpg';
import './Creator.css';
import CreateQuiz from './CreateQuiz';
import CreateLesson from './CreateLesson';
import CreateSubject from './CreateSubject';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { message } from 'antd';
import axios from 'axios';
import { appUrl } from '../../Helpers';
import { useNavigate } from 'react-router-dom';
import { getQuizzes } from '../../state/quizzesSlice';
import { getLessons } from '../../state/lessonsSlices';
import { getSubjects } from '../../state/subjectsSlice';
import { shortenString } from '../../Helpers';
import { sortDate } from '../../Helpers';
import Loader from '../../components/Loader/Loader';

function Creator() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [quiz, setQuiz] = React.useState();
    const [lesson, setLesson] = React.useState();
    const [subject, setSubject] = React.useState();
    const navigate  = useNavigate();

    const [showQuiz, setShowQuiz] = React.useState(false);
    const [showSubject,setShowSubject] = React.useState(false);
    const [showLesson, setShowLesson] = React.useState(false);

    const userId = useSelector(state => state.users.user._id);
    const subjects = useSelector(state => state.subjects.data);
    const hasSubjects = useSelector(state => state.subjects.data);
    const hasQuizzes = useSelector(state => state.quizzes.data);
    const hasLessons = useSelector(state => state.lessons.data);

    const quizStatus = useSelector(state => state.quizzes.status);
    const subjectStatus = useSelector(state => state.subjects.status);
    const lessonStatus = useSelector(state => state.lessons.status);

    const dispatch = useDispatch();
    function handleShowQuiz(){
        setShowQuiz(prev => !prev)
    }

    function handleShowSubject(){
        setShowSubject(prev => !prev);
    }

    function handleShowLesson(){
        setShowLesson(prev => !prev);
    }

   


    
    const deleteQuiz = async(id)=>{
        try {
            setIsLoading(true);
            const response = await axios.delete(`${appUrl}quizzes/${id}`);
            const {data} = response;
            dispatch(getQuizzes())
            message.success('Quiz deleted successfully');
            console.log(data);
        } catch (error) {
            message.error('Try again later ! Something went wrong')
        } finally{
            setIsLoading(false)
        }
    }

    const deleteLesson = async(id)=>{
        try {
            setIsLoading(true);
            const response = await axios.delete(`${appUrl}lessons/${id}`);
            const {data} = response;
            dispatch(getLessons());
            message.success('Lesson deleted successfully')
            console.log(data);
        } catch (error) {
            message.error('Try again later ! Something went wrong')
        } finally{
            setIsLoading(false)
        }
    }

    const deleteSubject = async(id)=>{
        try {
            setIsLoading(true);
            const response = await axios.delete(`${appUrl}subjects/${id}`);
            const {data} = response;
            message.success('Subject deleted successfully')
            console.log(data);
        } catch (error) {
            message.error('Try again later ! Something went wrong')
        } finally{
            setIsLoading(false)
        }
    }

    React.useEffect(()=>{

        if(lessonStatus === 'idle'){
            dispatch(getLessons());
        }

        if(quizStatus === 'idle'){
            dispatch(getQuizzes());
        }

        if(subjectStatus === 'idle'){
            dispatch(getSubjects());
        }

        if(hasLessons?.length){
            setLesson(hasLessons?.filter((sub)=> sub.userId === userId))
        }
        if(hasSubjects?.length){
            setSubject(hasSubjects?.filter((sub)=> sub.userId === userId))
        }

        if(hasQuizzes?.length){
            setQuiz(hasQuizzes?.filter((sub)=> sub.userId === userId))
        }

    }, [dispatch, lessonStatus, subjectStatus, quizStatus])

    if(isLoading){
        return <Loader/>
    }
   
   
  return (
    <div className='creator-section'>

        {showQuiz? <CreateQuiz handleShowQuiz={handleShowQuiz}/>:<></>}
        {showLesson? <CreateLesson handleShowLesson={handleShowLesson} />:<></>}
        {showSubject? <CreateSubject handleShowSubject={handleShowSubject} />:<></>}
        <div className="creator-hero">
            <div className='background-overlay'></div>
            {
                    hasSubjects.length || hasLessons.length || hasQuizzes.length ?
                <div className="hero-text">
                    <h2>Welcome back to Content Creators Work Space</h2>
                    <p>Continue enjoying creating with us</p>
                    
                    <button className='lc-btn'>Join Creators Community</button>
                </div>:

                <div className="hero-text">
                    <h2>Welcome to Content Creators Work Space</h2>
                    <p>Create your first course, quiz or lesson !</p>

                    <button className='lc-btn'>Join Creators Community</button>
                </div>

                    
                }
           
            
        </div>

        <div className="creations-container">

        </div>

        <div className="creator-tabs">

            <div className="c-subject creation c-subject-overlay">

                <div className="creation-contents">
                    <h3>Create Subject</h3>
                    <button onClick={handleShowSubject} className='lc-btn'>Create</button>
                </div>

            </div>
    
            <div className="creation c-lesson c-lesson-overlay">

                <div className="creation-contents">
                    <h3>Create Lesson</h3>
                    <button onClick={handleShowLesson} className='lc-btn'>Create</button>
                </div>

            </div>

            <div className="creation c-quiz c-quiz-overlay">
                <div className="creation-contents">
                    <h3>Create Quiz</h3>
                    <button onClick={handleShowQuiz} className='lc-btn'>Create</button>
                </div>
                
            </div>


        </div>

        { subject || lesson || quiz?<div className="l-creators-container">
            <div className='l-creator-find-container'> 
                <div className="l-service-icon-container l-creator-icon-container">
                    <IoIosCreate className='l-service-icon l-creator-icon'/>
                </div>

                 <h2 className='l-creators-title'>Take a look at what you have created</h2>

            </div>
           
            
            {
                subject?
                <div className="l-creators-subjects">
                    <h3 className='l-creators-section-title'>Subjects</h3>
                    {
                        sortDate(subject)?.map((subject)=>{
                            const{title, _id} = subject;
                            return(
                                <div key={subject._id} className="l-subject-container">
                                    <p>{shortenString(title)}</p>
                                    <div className="l-buttons-container">
                                        <button onClick={()=> navigate(`/learners-corner/edit/subject/${subject._id}`)} className='l-btn l-edit-btn'><CiEdit/> Edit</button>
                                        <button onClick={()=>{deleteSubject(_id)}} className='l-btn l-delete-btn'> <MdDelete/> Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            :<></>
}

{
                lesson?
                <div className="l-creators-subjects">
                      <h3 className='l-creators-section-title'>Lessons</h3>
                    {
                        sortDate(lesson).map((lesson)=>{
                            const{title, subjectId, _id} = lesson;
                            const subject = subjects.find((sub)=> sub._id === subjectId);

                            return(
                                <div key={lesson._id} className="l-subject-container">
                                     <div className="l-subject-container-text">
                                        <p><strong>{shortenString(title)}</strong></p>
                                        <p>{subject.title}</p>
                                    </div>
                                    <div className="l-buttons-container">
                                        <button onClick={()=> navigate(`/learners-corner/edit/lesson/${lesson._id}`)} className='l-btn l-edit-btn'><CiEdit/> Edit</button>
                                        <button onClick={()=>{deleteLesson(_id)}} className='l-btn l-delete-btn'> <MdDelete/> Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            :<></>}
                

            
            {
                sortDate(quiz)?
                <div className="l-creators-subjects">
                      <h3 className='l-creators-section-title'>Quizzes</h3>
                    {
                        quiz.map((quiz)=>{
                            const {question, _id, subjectId} = quiz;
                            const {title} = subjects.find((sub)=> sub._id === subjectId);

                            return(
                                <div key={_id} className="l-subject-container">
                                    <div className="l-subject-container-text">
                                        <p><strong>{shortenString(question)}</strong></p>
                                        <p>{title}</p>
                                    </div>
                                    
                                    <div className="l-buttons-container">
                                        <button onClick={()=>{navigate(`/learners-corner/edit/quiz/${_id}`)}} className='l-btn l-edit-btn'><CiEdit/> Edit</button>
                                        <button onClick={()=>{deleteQuiz(_id)}} className='l-btn l-delete-btn'> <MdDelete/> Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            :<></>}
        </div>:<></>}

        <Footer/>
    </div>
  )
}

export default Creator