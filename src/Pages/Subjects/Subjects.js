import React from "react";
// import LessonsData from "./LessonsData";
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, selectAllSubjects, selectSubjectStatus } from "../../state/subjectsSlice";
import { appUrl, shortenString, sortDate } from "../../Helpers";
import './online.css';
import { getQuizzes } from "../../state/quizzesSlice";
import Loader from "../../components/Loader/Loader";

export default function Subjects(){
    const dispatch = useDispatch();

    const [viewQuiz, setViewQuiz] = React.useState(false);
    const quizzes = useSelector(state => state.quizzes.data);
    const quizzesStatus = useSelector(state => state.quizzes.status);

    
    const status = useSelector(state => state.subjects.status);
    const subjects = useSelector(state => state.subjects.data);
    const navigate = useNavigate();
    const [subjectData , setSubjectData]= React.useState();
    // console.log(subjectData);


    const foundQuizzes = subjects.filter((subject)=>{
       return quizzes?.find((quiz)=> quiz.subjectId === subject._id);
        
    });
  
    const [searchValue, setSearchValue] = React.useState({
        search:'',
        toggleDisplay:true

    });
    

    const handleChange = function (e){
        setSearchValue(prevSearch =>{
            const {name, value }= e.target;
            return{
                ...prevSearch,
                [name]:value,
                
            }
        });
    }
    //lets render data on conditioon

   

    function handleSearch(){
        setSubjectData(prevData =>{
        
            const newData = prevData.filter((data)=>{

                var searchInput = searchValue.search;
                var tokens = searchInput.toString().toLowerCase().split(' ').filter(token =>{
                    return token.trim() !== '';
                }).join(' ');
               
                if(searchInput.search){
                    console.log('length')
                    const regex = new RegExp(tokens, 'gim');
                    const myData = data.title.toLowerCase() +' '+ data.description.toLowerCase();
                    return myData.match(regex);
                    
                }
                else{
                    return prevData
                }

                
                
            })
            return newData;
        })
    }
    
  
   
    const styles={
        width:250,
        height:200,
        marginLeft:20,
        marginRight:20
    }
     const data = sortDate(subjectData)?.map((subject)=>{ 
      
        const {title, description, form, subjectImage} = subject;
        const image = subjectImage.slice(8);
        return(
            
            <div onClick={()=> navigate(`/learners-corner/online/lesson/${subject._id}`)} key={subject?._id} style={styles} className="l-lesson">
                <img className="lesson--image" src={`${appUrl}uploads/${image}`} alt='subject'></img>
                <div className="context--container">
                    <h3 className="lesson--title">{shortenString(title)} {form} </h3>
                    <p className="lesson--description">{description.length > 36? description.substring(0, 48) +'...': description}</p>
                </div>
                
                <div className="background-overlay"></div>
            </div>
           

        )
    });


    const quizData = sortDate(foundQuizzes)?.map((quiz)=>{
        const {title, form} = quiz;
        console.log(quiz);
        return (
            <div key={quiz?.id} onClick={()=> {navigate(`/learners-corner/online/quiz/${quiz?._id}`)}} className="l-online-quiz">
                <p>{shortenString(title)} {form}</p>
                
            </div>
        )

    });



    React.useEffect(()=>{   

        console.log(quizzes)
        console.log('found: '+ foundQuizzes)
          
        if(status === 'idle'){
            dispatch(getSubjects())
        }
        
        if(quizzesStatus === 'idle'){
            dispatch(getQuizzes())
        }

        setSubjectData(subjects)

    }, [status, dispatch, quizzesStatus, subjects]);


    if(status ==='idle'){
        return <Loader/>
    }

    return(
        <div>
            <div className="header--container">
                <div className="header-btn-container">
                    <button onClick={()=> setViewQuiz(false)} className="course-btn">Lessons</button>
                    <button onClick={()=> setViewQuiz(true)} className="course-btn">Quizzes</button>
                </div>
              
                
                <div className="input--container">
                    <input onChange={handleChange} value={searchValue.search} name="search"className="search--input" placeholder="search lesson"  type='text'></input>
                    <button onClick={handleSearch} className="button--search">Search</button>
                </div>
                
            </div>

            <br />
            {!viewQuiz?<div className="lessons--container">
                {data}
            </div>:
            
            
            <div className="lessons--container">
                {quizData}
            </div>
            
            }
            
        </div>
      
    )
}