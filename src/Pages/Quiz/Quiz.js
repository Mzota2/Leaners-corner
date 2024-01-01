import React from "react";
import './quiz.css'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizzes } from "../../state/quizzesSlice";
import { getSubjects } from "../../state/subjectsSlice";
import Rating from '@mui/material/Rating';
import { getUsers } from "../../state/usersSlice";
import { IoMdMenu } from "react-icons/io";
import { shortenString } from "../../Helpers";
import { array } from "yup";
import Loader from "../../components/Loader/Loader";


 export default function Quiz(){

  const {subjectId} = useParams();
  const dispatch  = useDispatch();

  //users
  const users = useSelector(state => state.users.allUsers);
  const usersStatus = useSelector(state => state.users.status);
  
  const allSubjects = useSelector(state => state.subjects.data);
  const subjectsStatus = useSelector(state => state.subjects.status);
  const foundSubject = useSelector(state => state.subjects.data.find(sub => sub._id === subjectId));


  const quizzesStatus = useSelector(state => state.quizzes.status);
  const foundQuizzes = useSelector(state => state.quizzes.data);
  const quizzes = foundQuizzes.filter(quiz => quiz.subjectId === subjectId);
  const form = foundSubject?.form;
  const subject = foundSubject?.title;

  const [filterByAuthor, setFilterByAuthor] = React.useState(quizzes);
  const [selectSubject, setSelectSubject] = React.useState();


  //quiz state
  const [viewAnswer, setViewAnswer] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [selectedQuiz, setSelectedQuiz] = React.useState();
  const [score, setScore] = React.useState(0);
  let isCompleted = index === quizzes.length;
  let overAllScore =(score / quizzes?.length).toFixed(1)*100;


  //filter
  const quizzesUserId = quizzes?.map((quiz)=>{
    return quiz?.userId
  });

  const usersId = users?.map((user)=>{
    return user?._id;
  });

  const authorsSet = new Set([...quizzesUserId, ...usersId]);
  const authors = Array.from(authorsSet);

  //search
  const [search, setSearch] = React.useState('');
  const [searchQuiz, setSearchQuiz] = React.useState();

  //menu
  const [displayMenu, setDisplayMenu] = React.useState(false);

  function handleDisplayMenu(){
    setDisplayMenu(prev => !prev);
  }


  function handleSearch(e){
    setSearchQuiz(prev =>{
        if(search.length){
            const searchString = search.split(' ').filter((s)=> s !=='').join('').toLowerCase();
            const regex = new RegExp(searchString, 'gim');

            console.log(searchString);
            const fQuizzes = quizzes?.filter((quiz)=>{
                const {question} = quiz;

                const query = question.toLowerCase();
                console.log(query);

                const isMatch = query.match(regex);
                return isMatch;
            });
            console.log(fQuizzes);

            return fQuizzes;
        }
    })
  }

  function closeSearch(e){
      if(search.length && !e.target.classList.contains('l-lesson-search-preview')){
          setSearch('');
      }
  }
  function handleChange(e){
    setSearch(e.target.value);
}

  function handleSelectQuiz(id){
    navigate(`/learners-corner/online/quiz/${id}`);
  }

 
 
  //local storage

  const navigate = useNavigate()
  function handleChangeSubject(e){
    setSelectSubject(e.target.value);
    navigate(`/learners-corner/online/quiz/${e.target.value}`);
  }

  function handleFilter(e){
    setFilterByAuthor(prev =>{
      if(e.target.value === 'All'){
        console.log('all')
        return prev;
      }
      else{
        console.log(e.target.value);
        const filteredQuizzes =quizzes?.filter((quiz)=> quiz?.userId === e.target.value);
       
      }
    })
    

  }



  //handling onclick
const scoreGrade= overAllScore <=49? 'poor':overAllScore <=65 ?'good': overAllScore <=75?'very-good':'excellent';

function handlePlayAgain(){
  setIndex(0);
  setScore(0);
  setSelectedQuiz(quizzes[0])
  setViewAnswer(false);
}

React.useEffect(()=>{
  if(quizzesStatus === 'idle'){
    dispatch(getQuizzes())
  }

  if(usersStatus === 'idle'){
    dispatch(getUsers());
  }

  if(subjectsStatus === 'idle'){
    dispatch(getSubjects())
  }

  if(foundQuizzes?.length){
    setSelectedQuiz([quizzes[index]]);
  }

  
}, [quizzesStatus, foundQuizzes, dispatch, usersStatus, subjectsStatus, index]);

React.useEffect(()=>{
  
  document.addEventListener('mousedown', closeSearch);
        
  return ()=> document.removeEventListener('mousedown', closeSearch)

}, [searchQuiz])

if((quizzesStatus === 'idle')){
  return <Loader/>
}

else if(!quizzes.length || !selectedQuiz?.length){
  return <p>No quizzes uploaded</p>
}
  
return(
  <section>
    <nav className="l-quiz-container">

      <div className="l-quiz-top-container">
        <h3 className="l-quiz-top-container-title-mobile">Quiz</h3>

        <div onClick={handleDisplayMenu} className="l-quiz-menu-container">
            <IoMdMenu className="l-menu-icon"/>
        </div>

        <div className="l-quiz-top-container-desktop">
          <h3>Quiz</h3>
          <div className="l-lesson-search-container">
              <input value={search} onChange={(e)=>{handleChange(e); handleSearch(e);}} className="l-lesson-search-input" type="text" placeholder="Search lesson..." />
              <button className=" l-lesson-search-btn">Search</button>
              {search.length?<div className="l-lesson-search-preview">
                                {
                                    searchQuiz?.map((quiz)=>{
                                        const {question, _id} = quiz
                                        return(
                                            <p onClick={()=>{ handleSelectQuiz(_id); setSearch('')}} key={quiz._id} className="l-lesson-preview-title">{question}</p>
                                        )
                                    })
                                }
                                
                            </div>:<></>}
          </div>

          <div className="l-lesson-stats">
              <Rating name="half-rating-read-only" value={2} precision={0.5} readOnly  />
          </div>
        </div>

       { displayMenu? <div className="l-quiz-top-container-mobile">
          <div className="l-lesson-search-container">
              <input value={search} onChange={(e)=>{handleChange(e); handleSearch(e);}} className="l-lesson-search-input" type="text" placeholder="Search lesson..." />
              <button className=" l-lesson-search-btn">Search</button>
              {search.length?<div className="l-lesson-search-preview">
                                {
                                    searchQuiz?.map((quiz)=>{
                                        const {question, _id} = quiz
                                        return(
                                            <p onClick={()=>{ handleSelectQuiz(_id); setSearch('')}} key={quiz._id} className="l-lesson-preview-title">{question}</p>
                                        )
                                    })
                                }
                                
                            </div>:<></>}
          </div>

          <div className="l-lesson-stats">
              <Rating name="half-rating-read-only" value={2} precision={0.5} readOnly  />
          </div>
        </div>:<></>}

      </div>
      

      <div className="l-quiz-bottom-container">
        <div className="l-filter-author-container">
          <label htmlFor="author">Author</label>
          <select name="userId" id="author">
            <option value="All">All</option>
            {/* {users.length?authors?.map(authorId =>{
              const {username} =  users?.find((user)=> user._id === authorId);
              console.log(username)
              return(
                <option key={authorId} value={authorId}>{username}</option>
              )
            }):<></>} */}
          </select>
        </div>

        <div className="l-filter-author-container">
          <label htmlFor="author">Subject</label>
          <select value={selectSubject} onChange={handleChangeSubject} name="subjectId" id="author">
            {allSubjects?.map((subject)=>{
                const {title, _id, form} = subject
              return(
                  <option key={_id} value={title}>{title} {form}</option>
              )
            }) }
            
          </select>
        </div>

          
      </div>
      
    </nav>
    <br />
    <main>

      <div  className="l-top"></div>
      

      <div className="questions_container">
    

          {!isCompleted?<div className="inner_container">
             
              {selectedQuiz?.length? selectedQuiz?.map((quiz)=>{
                      const {question, choices} = quiz;
                    return(
                      <div className="l-inner-inner-container" key={quiz._id} style={{width:'100%'}}>
                        <p id="question">{question}</p> 

                        <div className="l-answer-container">
                          {choices?.map((choice)=>{
                              const {answer, correct}= choice;

                            return(
                              
                                <div key={answer} className="l-answer" id="answer" onClick={(e)=>{
                                    if(index < quizzes?.length){
                                      if(correct){
                                        setScore(prev => prev = prev +1);
                                        e.target.classList.add('l-correct-answer');
                                      }

                                      else{
                                        e.target.classList.add('l-wrong-answer')
                                      }
                                      setTimeout(()=>{
                                          setIndex(prev => prev = prev +1);
                                      }, 1500);
                                      
                                    }
                                }} >
                                  <p className="l-quiz-answer-text">{answer}</p>
                                </div>
                            )
                          })}
                          </div>
                      </div>
                      
                        
                    )
                  }):''}
             
          </div>:

          <div className="l-quiz-marking-container">
            <div className="l-quiz-top-marking">

              <div className="l-score-container">
                <p className="l-score">Score: <strong>{overAllScore}%</strong></p>
              </div>

              <h4 className="l-subject">{shortenString(subject)} {form}</h4>
            </div>
           
            {score >= (quizzes?.length / 2) && !viewAnswer ? <p className={`l-marking-message l-marking-message-${scoreGrade}`}>Congratulations 🎉 you have passed <span> {overAllScore}% </span> of the questions</p>:
            
            !score >= quizzes?.length / 2?
            <p className={`l-marking-message l-marking-message-${scoreGrade}`}>Try again ! you have failed <span>{100 - overAllScore}% </span>of the questions</p>:<></>}
            {!viewAnswer && score > quizzes?.length / 2 ? <button type="button" className=" l-view-answer-btn" onClick={()=>setViewAnswer(true)}>View Answers</button>:
             !score > quizzes?.length / 2?
            <button onClick={handlePlayAgain} className="l-view-answer-btn">Try again</button>:<></>
            
            }
            
            <div className="inner_container">
            {
              viewAnswer?
              
              
              quizzes?.map((quiz)=>{
                const {choices, question}= quiz;
                return(
                  
                  <div className="l-quiz-marking-c" key={quiz._id} style={{width:'100%'}}>
                  <p id="question">{question}</p> 
  
                  <div className="l-answer-container">
                    {choices?.map((choice)=>{
                        const {answer, correct}= choice;
  
                      return(
                        
                        <div key={answer} className={`l-answer ${correct? 'l-correct-answer':''}`} id="answer" >
                          <p className="l-quiz-answer-text">{answer}</p>
                        
                        </div>
                      )
                    })}
                    </div>
                </div>
                )
              }):<></>
            }
                
              </div>
            
            
           

          </div>
          
          }

          {isCompleted?<div className="l-marking-button-container">
            <button onClick={handlePlayAgain} className="l-btn l-btn-play-again">Play Again</button>
            <button className="l-btn l-btn-challenge">Challenge</button>

          </div>:<></>}
        
      </div>

      <div className="l-bottom"></div>

    </main>
    
   

  </section>
  )
 }