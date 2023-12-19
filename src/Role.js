import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import { getLoggedInUser } from './state/usersSlice';


function Role() {
    const user = useSelector(state => state.users.user);
    const userStatus = useSelector(state => state.users.status);
    const dispatch = useDispatch();

    const role = user?.role;
    const location = useLocation();
    const from = location?.state?.from?.pathname;
    React.useEffect(()=>{
      
      if(userStatus === 'idle'){
        dispatch(getLoggedInUser());
      }
       
    }, [user, dispatch, userStatus])
  return (
    <div>
        {
                role ==='student'?
                <Navigate to={from || '/learners-corner'}/>:
                    role==='teacher'?
                        <Outlet/>:
                        <Navigate to={'/learners-corner'} />

        }
    </div>
  )
}

export default Role