import axios from 'axios';
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { appUrl } from '../../Helpers';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import Loader from '../../components/Loader/Loader';

function CreateSubject({handleShowSubject}) {
    const userId = useSelector(state => state.users.user._id);
    const [isLoading , setIsLoading] = React.useState(false);
    const [subject, setSubject] = React.useState({
        title:'',
        form:'',
        description:'',
        subjectImage:'',
        userId
    });

    function handleChange(e){
        setSubject(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    function handleChangeImage(e){
        setSubject(prev =>{
            return{
                ...prev,
                subjectImage:e.target.files
            }
        });

        console.log(subject.subjectImage);
    }

    const postSubject = async(subject)=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`${appUrl}subjects`, subject);
            const {data}= response;
            message.success('Created subject successfully');
            
        } catch (error) {
            message.error('Try again later! Something went wrong');
            console.log(error);
            
        }finally{
            setSubject({});
            setIsLoading(false)
        }
    }

    function handleSubmit(){
        console.log(subject)
     
        const formData = new FormData();
        const fileList = subject.subjectImage;

        for(let i=0; i<fileList.length; i++){
            let file = fileList[i];
            formData.append('file', file);
        }
        formData.append('description', subject.description);
        formData.append('title', subject.title);
        formData.append('userId', subject.userId);
        formData.append('form', subject.form);
        
        if(subject.title && subject.description && subject.subjectImage && subject.userId && subject.form){
            postSubject(formData)
        }
        else{
            console.log('You have empty fields')
        }
       
    }

    if(isLoading){
        return <Loader/>
    }

  return (
    <div className='quiz-creator-container'>
        <br />
        <AiOutlineClose onClick={handleShowSubject} className='close-creator-icon'></AiOutlineClose>
        <br />
        <form noValidate className='sign-form content-creator-form'>
            <div className="col">
                <label htmlFor="">Select class</label>
                <select onChange={handleChange} value={subject.form} className='c-select-input' name="form" id="lesson">
                    <option value=""></option>
                    <option value="Form 1">Form 1</option>
                    <option value="Form 2">Form 2</option>
                    <option value="Form 3">Form 3</option>
                    <option value="Form 4">Form 4</option>
                    <option value="Standard 5">Standard 5</option>
                    <option value="Standard 6">Standard 6</option>
                    <option value="Standard 7">Standard 7</option>
                    <option value="Standard 8">Standard 8</option>
                </select>

            </div>

            <div className="row">
                <label htmlFor="title">Title</label>
                <input className='c-title-input' name='title' type="text" id='title' value={subject.title} onChange={handleChange}  />
            </div>

            <div className="row">
                <label htmlFor="description">Description</label>
                <textarea value={subject.description} onChange={handleChange} className='c-description-input' name="description" id="description" cols="30" rows="7"></textarea>
            
            </div>

            <div className="row">
                <label htmlFor="backgroundImage">Background Image</label>
                <input type="file" id='subtitle' className='c-file-input' onChange={handleChangeImage} />
            </div>

            <button type='button' onClick={handleSubmit} className='create-btn'>Create Subject</button>

        </form>

</div>
  )
}

export default CreateSubject