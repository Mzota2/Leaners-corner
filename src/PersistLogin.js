import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appUrl, getUser } from './Helpers';
import { getLoggedInUser, setToken, setUser } from './state/usersSlice';
import { Navigate, Outlet, useLocation  } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { message } from 'antd';

function PersistLogin() {
    const [isLoading, setIsLoading] = React.useState(false);
    const token = useSelector(state => state.users.token);
    const dispatch= useDispatch();
  
    const refreshToken = async()=>{
        try {
            setIsLoading(true);
            const response = await axios.get(`${appUrl}refresh`, {
                withCredentials:true
            });
            const {data} = response;
            dispatch(setToken(data));
            dispatch(getLoggedInUser(data));
    
            
        } catch (error) {
            console.log(error)
            
        }finally{
            console.log('done')
            setIsLoading(false);
        }
    }
    
    React.useEffect(()=>{
        
        if(!token){
            refreshToken();
        }

    }, [token])
  return (
    <div>
        {isLoading ?<Loader/>
        
        :<Outlet/>}
    </div>
  )
}

export default PersistLogin