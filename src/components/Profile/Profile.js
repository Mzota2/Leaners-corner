import React, { useRef } from 'react'
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { TiUserDelete } from "react-icons/ti";
import {appUrl} from '../../Helpers';
import axios from 'axios';
import {message} from 'antd';
import './Profile.css';
import { useSelector } from 'react-redux';

function Profile({user, profileRef, setShowProfileNav}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState();
    const [showDelete, setShowDelete] = React.useState(false);

    const token = useSelector(state => state.users.token);

    const [delUser, setDelUser] = React.useState('');

    function handleChange(e){
      setDelUser(e.target.value);
    }

    const deleteRef = useRef(null);

    async function handleDeleteAccount(){
      try {
        if(delUser === user?.username){
          setIsLoading(true);
          const response = await axios.delete(`${appUrl}user/${user?._id}`, {
            withCredentials:true,
            headers:{
              Authorization:'bearer '+token
            }
          });
          const {data} = response;
          console.log(data);
          navigate('/learners-corner/signup');
          message.success('Account Deleted');
        }
        else{
          message.error('The usernames do not match. Type again to verify !')
        }
       
        
      } catch (error) {
        console.log(error);
        message.error('Try again later ! Something went wrong');
      }finally{
        setIsLoading(false);
      }
    }

    function toggleProfile(){
      console.log(user);
      setShowProfileNav(false)
    }
    function hideProfile(e){
      if(!profileRef?.current?.contains(e.target)){
        setShowProfileNav(false);
      }
        

    }

    function handleShowDelete(){
      setShowDelete(true);
    }

    function hideDelete(e){
      if(!deleteRef?.current?.contains(e.target)){
        setShowDelete(false);
      }
     
    }

    React.useEffect(()=>{
      console.log(token)
      document.addEventListener('mousedown', hideProfile);

      return ()=>{
        document.removeEventListener('mousedown', hideProfile);
      }

      

    }, [])

    React.useEffect(()=>{

      document.addEventListener('mousedown', hideDelete);

      return()=>{
        document.removeEventListener('mousedown', hideDelete);
      }

    }, [])


  return (
    <div ref={profileRef} className='l-user-profile-settings-container'>

      {showDelete? <div className="l-delete-overlay">
            <div ref={deleteRef} className="l-delete-container">

            <p style={{fontSize:'1.2rem'}}>Are you sure you want to <strong style={{color:'red'}}>delete</strong> this account ?</p>

            <label style={{fontSize:'1rem'}} htmlFor="l-delete">~~Enter the username of your account to confirm~~</label>

            <input autoComplete='off' value={delUser} onChange={handleChange} id='l-delete' type="text" className='lc-input lc-input-delete' placeholder='Type here...' />

            <button disabled={isLoading} onClick={handleDeleteAccount} style={{fontSize:'1.2rem'}} className='l-btn l-delete-btn'>Delete</button>

            </div>
        </div>:<></>}
     

        <p className="l-settings-username"><FaRegUser/> {user?.username}</p>
        <button onClick={()=>{navigate('/learners-corner/user/settings'); toggleProfile();}} className='l-btn l-settings-btn'><IoMdSettings/>Settings</button>
        <button onClick={()=>{ handleShowDelete();}} className='l-btn l-del-account'><TiUserDelete/> Delete</button>

    </div>
  )
}

export default Profile