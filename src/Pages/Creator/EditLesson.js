import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import TextEditor from '../../components/TextEditor/TextEditor';
import axios from 'axios';
import { appUrl } from '../../Helpers';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function EditLesson() {
    const {id} = useParams();
    const foundLesson = useSelector(state => state.lessons.data.find((lesson)=> lesson._id === id));

    const [isLoading, setIsLoading] = React.useState(false);
   

    const [lesson, setLesson] = React.useState();

    function handleChange(e){
        setLesson(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    function handleChangeImage(e){
        setLesson(prev =>{
            return{
                ...prev,
                backgroundImage:e.target.files
            }
        })
    }

    const editLesson = async(formData)=>{
        try {
            setIsLoading(true);
            const response = await axios.put(`${appUrl}lessons/${id}`, formData);
            const {data} = response;
            message.success('Lesson updated')
        } catch (error) {
            message.error('Try again later ! Something went wrong');
        } finally{
            setIsLoading(false);
        }
    }

    function handleSubmit(){
        console.log(lesson)
        const formData = new FormData();
        const fileList = lesson.backgroundImage;

        for(let i=0; i<fileList.length; i++){
            let file = fileList[i];
            formData.append('file', file);
        }
        formData.append('form', lesson.form);
        formData.append('title', lesson.title);
        formData.append('subTitle', lesson.subTitle);
        formData.append('contents', lesson.contents);
        formData.append('userId', lesson.userId);
        formData.append('subjectId', lesson.subjectId);

        editLesson(formData);

    }


    React.useEffect(()=>{
        setLesson(foundLesson);
       

    }, [foundLesson])


    if(isLoading){
        return <Loader/>
    }
  return (
    <div className='quiz-creator-container'>
       
        <form noValidate className='sign-form content-creator-form'>
            
            <div className="row">
                <label htmlFor="title">Title</label>
                <input name='title' onChange={handleChange} className='c-title-input' type="text" id='title' value={lesson?.title}  />
            </div>

            <div className="row">
                <label htmlFor="subtitle">Sub Title</label>
                <input className='c-title-input' name='subTitle' onChange={handleChange} type="text" id='subtitle' value={lesson?.subTitle}  />
            </div>

            <div className="row">
                <label htmlFor="backgroundImage">Background Image</label>
                <input className='c-file-input' onChange={handleChangeImage} type="file" id='subtitle'  />
            </div>

            <TextEditor setLesson={setLesson} lesson={lesson}/>

            <button type='button' onClick={handleSubmit} className='create-btn'>Edit Lesson</button>
            
        </form>

</div>
  )
}

export default EditLesson;