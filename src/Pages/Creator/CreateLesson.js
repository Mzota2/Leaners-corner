import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { FaBold, FaItalic, FaLeaf } from "react-icons/fa";
import { FaAlignJustify , FaAlignCenter, FaAlignLeft, FaAlignRight,FaQuoteLeft, FaImage} from "react-icons/fa";
import { MdOutlineFormatColorText } from "react-icons/md";
import TextEditor from '../../components/TextEditor/TextEditor';
import axios from 'axios';
import { appUrl } from '../../Helpers';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { message } from 'antd';

function CreateLesson({handleShowLesson}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const user = useSelector(state => state.users.user);
    const subjects = useSelector(state => state.subjects.data);

    const [lesson, setLesson] = React.useState({
        title:'',
        subTitle:'',
        contents:'',
        backgroundImage:'',
        userId:user?._id,
        subjectId:undefined
    });

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

    const postLessons = async(lesson)=>{
        try {
            setIsLoading(true);

            const response = await axios.post(`${appUrl}lessons`, lesson);
            const {data} = response;
            console.log(data);
            message.success('Created lesson successfully');
            
        } catch (error) {
            console.log(error);
            message.error('Try again later ! Something went wrong');
        }finally{
            setIsLoading(false)
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

        console.log(formData)

        postLessons(formData);
    }


    React.useEffect(()=>{

    }, [subjects, user])


    if(isLoading){
        return <Loader/>
    }
  return (
    <div className='quiz-creator-container'>
        <br />
        <AiOutlineClose onClick={handleShowLesson} className='close-creator-icon'></AiOutlineClose>
        <br />
        <form noValidate className='sign-form content-creator-form'>
            <div className="col">
                <label htmlFor="">Select Subject</label>
                <select onChange={handleChange} value={lesson.subjectId} className='c-select-input' name="subjectId" id="lesson">
                    <option value=""></option>
                    {subjects?.map((subject)=>{
                        const {title, _id} = subject;
                        console.log(_id);
                        return(
                            <option key={_id} value={_id}>{title}</option>
                        )
                    })}
                    
                </select>

            </div>
            
            <div className="row">
                <label htmlFor="title">Title</label>
                <input name='title' onChange={handleChange} className='c-title-input' type="text" id='title' value={lesson.title}  />
            </div>

            <div className="row">
                <label htmlFor="subtitle">Sub Title</label>
                <input className='c-title-input' name='subTitle' onChange={handleChange} type="text" id='subtitle' value={lesson.subTitle}  />
            </div>

            <div className="row">
                <label htmlFor="backgroundImage">Background Image</label>
                <input className='c-file-input' onChange={handleChangeImage} type="file" id='subtitle'  />
            </div>

            <TextEditor setLesson={setLesson} lesson={lesson}/>

            <button type='button' onClick={handleSubmit} className='create-btn'>Create Lesson</button>
            
        </form>

</div>
  )
}

export default CreateLesson;