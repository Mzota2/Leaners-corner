import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from './state/usersSlice';
import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.users.status);

    React.useEffect(()=>{

        if(userStatus === 'idle'){
            dispatch(getLoggedInUser());
        }

    }, [dispatch,userStatus])
  return (
    <div>
        {
            user?
            <Outlet/>: <Navigate to={'/learners-corner'} />
        }
    </div>
  )
}

export default Protected