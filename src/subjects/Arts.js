import React from "react";
import { ArtData } from "../subjectData/artsData";
import './quiz.css'
import './history.css'
import { NavLink } from "react-router-dom";

 export default function ArtQuiz(props){

  const [historyData, setData]=React.useState(ArtData);
  const [currentIndex , setCurrentIndex]= React.useState(0);
  const[score , setScore] = React.useState(0);
  const[clicked , setCliked]= React.useState(false);
 

  function handlePrevious(){
     setCurrentIndex(currentIndex-1);
     setCliked(true);
     if(currentIndex <=0){
      setCurrentIndex(currentIndex);
     }
   }

   function handleFinish(){
     setCurrentIndex(0);
     setCliked(false);
   }

  function handleNext(){
      setCliked(false)
      setCurrentIndex(currentIndex+1);
      if(currentIndex >= ArtData.length-1){
          setCurrentIndex(currentIndex);
         
      }
  }
    const question = historyData[currentIndex].question;
    const answersArray = historyData[currentIndex].answers;
    const myArray = answersArray.map((answer)=>{ 
      function handleAnswer(){ 
        if(answer.correct && !clicked){
            setScore(score+1);
        }else{
         setScore(score+0)
        }
        setCliked(true);
      }
     
    return(

      <div>
         {currentIndex>=ArtData.length-1?<p className="score">Score:{score}</p>:console.log('we')}
      
         {currentIndex >=ArtData.length-1?console.log('me'):<div onClick={handleAnswer}className="answer" id="answer">{answer.text}</div>}

      </div>
    
    )
  });
    return(

    
    <main>
     
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="questions_container">
            <p onClick={handleFinish} className="finish"><i className="fab fa-solid fa-xmark"></i>  Finish session</p>
            <p onClick={handlePrevious} className="previous"> <i className="fab fa-solid fa-angle-left"></i> Previous question</p>
            <NavLink to='/artLessons'><p className="hs--goto">Go To Lessons<i class=" fab fas fa-angle-double-right"></i></p></NavLink>

            <div className="inner_container"><br/><br/>
                <p id="question">{question}</p>
                <div className="answer_container">
                    <div>{myArray}</div>
                </div>
            </div>
            <div className="buttons">
                <div className="image_button">Quiz</div>
                <button onClick={handleNext} id="submit">Submit</button>
            </div>
        </div>

    </main>
     )
 }