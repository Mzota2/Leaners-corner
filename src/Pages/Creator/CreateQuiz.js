import React from 'react'
import {Formik} from 'formik';
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from 'axios';
import { appUrl } from '../../Helpers';
import { useDispatch, useSelector } from 'react-redux';

import { getSubjects } from '../../state/subjectsSlice';
import Loader from '../../components/Loader/Loader';
import { message } from 'antd';

function CreateQuiz({handleShowQuiz}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const user = useSelector(state => state.users.user);
    const subjects = useSelector(state => state.subjects.data);
    const status = useSelector(state => state.subjects.status);
    const dispatch = useDispatch();

    const [qchoices, setqChoices] = React.useState([
        {answer:'', correct:false, id:1},
        {answer:'', correct:false, id:2},
        {answer:'', correct:false, id:3},
        {answer:'', correct:false, id:4},
    ]);

    const [choicesNum, setChoicesNum] = React.useState(2);

   
    const [quiz, setQuiz] = React.useState({
        question:'',
        form:'',
        choices:[
        ],
        subjectId:undefined,
        userId:user?._id

    });
   
    function handleChange(e){
        setQuiz(prev =>{
           return{ 
            ...prev,
            [e.target.name]:e.target.value
        }})

        setQuiz(prev =>{
            return{
                ...prev,
                choices:qchoices.slice(0, choicesNum)
            }
        }); 
    }
    function toggleChoice(id){
        const foundChoice = qchoices.find((item)=> item.id ===id);
        foundChoice.correct = !foundChoice.correct;
        console.log(foundChoice);
        setqChoices(prev =>{
            return[
                ...prev,
                
            ]
        });

        setQuiz(prev =>{
            return{
                ...prev,
                choices:qchoices.slice(0, choicesNum)
            }
        });  
        
    }
    
    function handleAddChoice(){
        
            if(choicesNum < 5 && quiz.choices.length >=2){
                setChoicesNum(prev => {
                    prev = prev + 1;
                    // setQuiz(prev =>{
                    //     return{
                    //         ...prev,
                    //         choices:qchoices.slice(0, choicesNum)
                    //     }
                    // });  
                    return prev;
                })
                
            }
            else if(choicesNum < 5){

                console.log('you have empty fields')
            }
            else{
                console.log('You cant add more choices')
            }
       
    }

    function handleRemoveChoice(){
        setChoicesNum(prev => {
            if(prev > 2){
                prev = prev - 1;
                return prev;
            }
            else{
                console.log('You cant remove more choices')
                return 2;
                
            }
        });
    }

    const postQuiz = async()=>{
        setQuiz(prev =>{
            return{
                ...prev,
                choices:qchoices.slice(0, choicesNum)
            }
        });


        try {
            setIsLoading(true);
            const response = await axios.post(`${appUrl}quizzes`, quiz );
            const {data} = response;
            console.log(data);
            message.success('Created quiz successfully');
            
        } catch (error) {
            console.log(error);
            message.error('Try again later! Something went wrong');
        }
        finally{
            setIsLoading(false);
        }
    }

    function handleSubmit(){
        postQuiz();
    }

    React.useEffect(()=>{
        if(status ==='idle'){
            dispatch(getSubjects())
        }
       
    }, [choicesNum])

    if(isLoading){
       return <Loader/>
    }

  
  return (
    <div className='quiz-creator-container'>
        <br />
        <AiOutlineClose onClick={handleShowQuiz} className='close-creator-icon'></AiOutlineClose>
        <br />
        <form noValidate className='sign-form content-creator-form'>

            <div className="col">
                    <label htmlFor="">Select Subject</label>
                    <select onChange={handleChange} className='c-select-input' name="subjectId" id="lesson">
                        <option value=""></option>
                        {
                            subjects?.map((subject)=>{
                                const {_id, title, form}= subject;
                                return(
                                    <option key={_id} value={_id}>{title} {form}</option>
                                )
                            })
                        }
                        
                        
                    </select>

                </div>
            
                <div className="row">
                    <label htmlFor="question">Question</label>
                    <textarea  cols={10} rows={5}  name='question' value={quiz.question} onChange={handleChange} type="text" className='c-description-input' />
                </div>

                <p>Tick if correct answer</p>

                {qchoices.slice(0, choicesNum).map((choice, index)=>{
                    return(
                        <div key={choice.id}  className="row"> 
                            <div className="col c-col">
                                <label htmlFor="choice">Choice</label> 
                                <input className='checkPassword' name='correct' type="checkbox" onChange={()=>{toggleChoice(choice.id)}} checked={choice.correct} />
                            </div>
                            <textarea name='answer' cols={10} rows={3} id='answer' value={choice.answer} onChange={(e)=> {
                                  const foundChoice = qchoices.find((item)=> item.id === choice.id);
                                  foundChoice.answer = e.target.value;
                                  setqChoices(prev =>{
                                    return[
                                        ...prev,
                                        
                                    ]
                                });

                            }} className='c-description-input' />
                        </div>
                    )
                
                })}

                <div className="col c-col-ad">
                    <button onClick={handleRemoveChoice} type='button' className='c-quiz-add c-quiz-remove'><IoMdRemove/></button>
                    <button onClick={handleAddChoice} type='button' className='c-quiz-add'><IoMdAdd/></button>
                </div>
                
                
                <br />

                <button type='button' onClick={handleSubmit} className='create-btn' >Create Quiz </button>
            </form>
    
    </div>
  )
}

export default CreateQuiz