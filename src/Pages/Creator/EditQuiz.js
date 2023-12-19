import React from 'react'
import {Formik} from 'formik';
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from 'axios';
import { appUrl } from '../../Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { getSubjects } from '../../state/subjectsSlice';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function EditQuiz() {
    const{id} = useParams();
    const [isLoading, setIsLoading] = React.useState(false);
    const user = useSelector(state => state.users.user);

    const subjects = useSelector(state => state.subjects.data);
    const foundQuiz = useSelector(state => state.quizzes.data.find((quiz)=> quiz._id === id));
    const dispatch = useDispatch();

    const [quiz, setQuiz] = React.useState()

    const [qchoices, setqChoices] = React.useState([
    ]);

   
    function handleChange(e){
        setQuiz(prev =>{
           return{ 
            ...prev,
            [e.target.name]:e.target.value
        }}); 
    }
    function toggleChoice(index){
       
        setqChoices(prev =>{
            const result = [...prev];
            
            result[index] =  {...result[index], correct:!prev[index].correct};

            return[
                ...result
            ]
        });

        setQuiz(prev =>{
            return{
                ...prev,
                choices:qchoices
            }
        });  
        
    }
    

    const editQuiz = async(quiz)=>{
        try {
            setIsLoading(true);
            const response = await axios.put(`${appUrl}quizzes/${id}`, quiz);
            const {data} = response;
            message.success('Quiz updated');

        } catch (error) {
            message.error('Try again later ! Something went wrong');

        } finally{
            setIsLoading(false);
        }
    }

    function handleSubmit(){
       
        console.log(qchoices);
        console.log(quiz);
        const isValid = false;
        const ar = qchoices?.map((item)=>{
            if(item.correct){
                return item.correct;
            }else{
                return false;
            }
        });
   

        if(ar?.includes(true)){
            editQuiz({...quiz, choices:qchoices})
        }else{
            message.error('Please make sure you have ticked atleast one correct answer')
        }

    }

    React.useEffect(()=>{
    
        setQuiz(foundQuiz);
        setqChoices(foundQuiz?.choices);
        
    }, [foundQuiz]);

    if(isLoading){
        return <Loader/>
    }

  
  return (
    <div className='quiz-creator-container'>
       
        <form noValidate className='sign-form content-creator-form'>

            <div className="col">
                    <label htmlFor="">Select Subject</label>
                    <select onChange={handleChange} className='c-select-input' name="subjectId" id="lesson">
                        <option value=""></option>
                        {
                            subjects?.map((subject)=>{
                                const {_id, title}= subject;
                                return(
                                    <option key={_id} value={_id}>{title}</option>
                                )
                            })
                        }
                        
                        
                    </select>

                </div>
            
                <div className="row">
                    <label htmlFor="question">Question</label>
                    <textarea  cols={10} rows={5}  name='question' value={quiz?.question} onChange={handleChange} type="text" className='c-description-input' />
                </div>

                <p>Tick if correct answer</p>

                {qchoices?.map((choice, index)=>{
                    const {answer, correct} = choice;
                    return(
                        <div key={choice._id}  className="row"> 
                            <div className="col c-col">
                                <label htmlFor="choice">Choice</label> 
                                <input className='checkPassword' name='correct' type="checkbox" onChange={()=>{toggleChoice(index)}} checked={qchoices[index].correct} />
                            </div>
                            <textarea name='answer' cols={10} rows={3} id='answer' value={qchoices[index].answer} onChange={(e)=> {
                                setqChoices(prev =>{
                                    const result = [...prev];
                                    result[index] = {answer:e.target.value, correct:correct};
                                    return result;
                                });

                                setQuiz(prev =>{
                                    return{
                                        ...prev,
                                        choices:qchoices
                                    }
                                });

                            }} className='c-description-input' />
                        </div>
                    )
                
                })}

                <br />

                <button type='button' onClick={handleSubmit} className='create-btn' >Edit Quiz </button>
            </form>
    
    </div>
  )
}

export default EditQuiz