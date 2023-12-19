import React from 'react'
import './Settings.css';
import {Formik} from 'formik';
import { settingsSchema } from '../../components/Yup/settingsSchema';
import { message } from 'antd';
import axios from 'axios';
import { appUrl } from '../../Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../state/usersSlice';
import { FaCamera } from "react-icons/fa";
import avatar from '../../Assets/avatar.png';
import Loader from '../../components/Loader/Loader';

function Settings() {

    const [profileImage, setProfileImage] = React.useState();
   
    const userStatus = useSelector(state => state.users.status);
    let foundUser = useSelector(state => state.users.user);
    const [isLoading, setIsLoading] = React.useState(false);

    const [user, setUser] = React.useState();
    const dispatch = useDispatch();

    function handleChangeUser(e){
        setUser(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    function handleChangeImage(e){
        setUser(prev =>{
           return{
            ...prev,
            profileImage:e.target.files
           } 
        })

        setProfileImage(e.target.files);
        

        
        console.log(profileImage)
    }

    async function updateUser(values){
        try {
            setIsLoading(true);
            const response = await axios.put(`${appUrl}user/${foundUser?._id}`, values, {
                withCredentials:true,
            });

            const {data} = response;
            message.success('profile updated successfully');
            foundUser = values;
            
        } catch (error) {
            message.error('Try Again later ! Something went wrong');
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }

    function handleSubmit(values, {resetForm}){
       
        const {username, about, interests, skills, experience, linkedInLink,twitterLink, whatsapp} = user;
        const formData = new FormData();
            {const fileList = user?.profileImage;
            for(let i=0; i<fileList?.length; i++){
                let file = fileList[i];
    
                formData.append('file', file);
            }
            formData.append('username', username);
            formData.append('about', about);
            formData.append('interests', interests);
            formData.append('skills', skills);
            formData.append('experience', experience);
            formData.append('linkedInLink', linkedInLink);
            formData.append('twitterLink', twitterLink);
            formData.append('whatsapp', whatsapp);}

            updateUser(formData);
    } 



    React.useEffect(()=>{

    }, [profileImage])

    React.useEffect(()=>{

        if(userStatus === 'idle'){
            dispatch(getLoggedInUser());
        }

        if(foundUser){
            setUser(foundUser);
        }
     
    }, [foundUser, dispatch, userStatus]);

if(!foundUser || isLoading){
    return <Loader/>
}

  return (
    <div className='l-settings-container'>
        <Formik
            validationSchema={settingsSchema}
            initialValues={
                user? user:foundUser
            }
           onSubmit={handleSubmit}
        >
            {({handleSubmit, touched, values, errors, handleChange})=>(
                <form onSubmit={handleSubmit} className='sign-form content-creator-form' autoComplete='off' noValidate action="">
                    
                    <div className="row l-settings-image-preview-container">
                            <img className='l-settings-image-preview' 
                            src={ profileImage? URL.createObjectURL(profileImage[0]):!values?.profileImage? avatar :`${appUrl}uploads/${values?.profileImage.slice(8)}`} alt="al" />
                            <label className='l-file-upload-label' htmlFor="profileImage"><FaCamera/></label>
                            <input  className='c-file-input l-custom-input' onChange={handleChangeImage} type="file" id='profileImage'  />
                    </div>
                    
                    <div className="row">
                            <label htmlFor="fullname">Name</label>
                            <input name='fullname' type="text" id='fullname'  value={values?.fullname} onChange={(e)=>{handleChange(e); handleChangeUser(e)}} className='lc-input lc-input-settings' />
                            {touched?.fullname && errors?.fullname && <p className='error-text'>{errors?.fullname}</p>}
                    </div>

                    <div className="row">
                        <label htmlFor="about">About</label>
                        <textarea   cols={10} rows={2} id='about' name='about' value={values?.about} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} type="text" className='c-description-input ' />
                        {touched?.about && errors?.about && <p className='error-text'>{errors?.about}</p>}
                    </div>
                {
                   foundUser?.role === 'teacher'? <div className='l-protected-settings'>

                        <p>Separate <strong>Interests</strong>, <strong>Skills </strong>and <strong>Experience</strong> with a comma</p>

                        <div className="row">
                            <label htmlFor="interests">Interests</label>
                            <textarea  cols={10} rows={5} id='interests' name='interests' value={values?.interests} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} type="text" className='c-description-input' />
                            {touched?.interests && errors?.interests && <p className='error-text'>{errors?.interests}</p>}
                        </div>

                        <div className="row">
                            <label htmlFor="skills">Skills</label>
                            <textarea  cols={10} rows={5} id='skills' name='skills' value={values?.skills} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} type="text" className='c-description-input' />
                            {touched?.skills && errors?.skills && <p className='error-text'>{errors?.skills}</p>}
                        </div>

                        <div className="row">
                            <label htmlFor="experience">Experience</label>
                            <textarea  cols={10} rows={5} id='experience' name='experience' value={values?.experience} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} type="text" className='c-description-input' />
                            {touched?.experience && errors?.experience && <p className='error-text'>{errors?.experience}</p>}
                        </div>

                        <div className="row">
                                <label htmlFor='linkedInLink'>LinkedIn Link</label>
                                <input name='linkedInLink' type='text' id='linkedInLink' value={values?.linkedInLink} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} className='lc-input lc-input-settings' />
                                {touched?.linkedInLink && errors?.linkedInLink && <p className='error-text'>{errors?.linkedInLink}</p>}

                        </div>

                    </div>:<></>
                   }

                    <div className="row">
                            <label htmlFor='twitterLink'>Twitter Link</label>
                            <input name='twitterLink' type='text' id='twitterLink' value={values?.twitterLink} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} className='lc-input lc-input-settings' />
                            {touched?.twitterLink && errors?.twitterLink && <p className='error-text'>{errors?.twitterLink}</p>}

                    </div>

                    <div className="row">
                            <label htmlFor='whatsapp'>WhatsApp</label>
                            <input name='whatsapp' type='text' id='whatsapp' value={values?.whatsapp} onChange={(e)=>{handleChange(e); handleChangeUser(e);}} className='lc-input lc-input-settings' />
                            {touched?.whatsapp && errors?.whatsapp && <p className='error-text'>{errors?.whatsapp}</p>}

                    </div>

                    

                    <button type='submit' className='l-submit-settings-btn'>Submit</button>

                </form>
            )}

            


        </Formik>


    </div>
  )
}

export default Settings