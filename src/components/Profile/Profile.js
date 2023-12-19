import React from 'react'
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { TiUserDelete } from "react-icons/ti";
import {appUrl} from '../../Helpers';
import axios from 'axios';
import {message} from 'antd';

function Profile({user, profileRef, setShowProfileNav}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState();

    async function handleDeleteAccount(){
      try {
        setIsLoading(true);
        const response = await axios.delete(`${appUrl}user`);
        const {data} = response;
        console.log(data);
        
      } catch (error) {
        console.log(error);
        message.error('Try again later ! Something went wrong');
      }finally{
        setIsLoading(false);
      }
    }

    function toggleProfile(){
      setShowProfileNav(false)
    }
    function hideProfile(e){
      if(!profileRef.current.contains(e.target)){
        setShowProfileNav(false);
      }
        

    }

    React.useEffect(()=>{

      document.addEventListener('mousedown', hideProfile);

      return ()=>{
        document.removeEventListener('mousedown', hideProfile);
      }

    }, [])
  return (
    <div ref={profileRef} className='l-user-profile-settings-container'>

        <p className="l-settings-username"><FaRegUser/> {user?.username}</p>
        <button onClick={()=>{navigate('/learners-corner/user/settings'); toggleProfile();}} className='l-btn l-settings-btn'><IoMdSettings/>Settings</button>
        <button onClick={()=>{toggleProfile();}} className='l-btn l-del-account'><TiUserDelete/> Delete</button>

    </div>
  )
}

export default Profile