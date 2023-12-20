import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { selectUser, setToken, setUser } from "../../state/usersSlice";
import { appUrl, logOut } from "../../Helpers";
import { IoCreateOutline } from "react-icons/io5";
import avatar from '../../Assets/avatar.png';
import Profile from "../Profile/Profile";
export default function NavBar(){
    const [isLoading, setIsLoading] = React.useState(false);

    const [menu , setMenu] = React.useState(false)
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showProfileNav, setShowProfileNav] = React.useState(false);

    const menuNav = useRef(null);
    const profileRef = useRef(null);

    function handleMenu(){
        setMenu(true);
    }
    function handleClick(){
        setMenu(false);
    }

    async function signOut(){
        try {
            setIsLoading(true);
            const leaveApp = await logOut();
            
            if(leaveApp){
                dispatch(setToken(''));
                dispatch(setUser({}));
                navigate('/learners-corner/signin');
            }
            
        } catch (error) {
            console.log(error);
            
        }finally{
            setIsLoading(false)
        }
    }

    function handleShowProfileNav(){
        setShowProfileNav(!showProfileNav);
    }

    function closeMenu(e){
        
        if(!menuNav?.current?.contains(e.target) && !e.target.classList?.contains('menu-icon')){
            console.log('working')
            setMenu(false);
        }
    }

    React.useEffect(()=>{

    }, [user])

    React.useState(()=>{
    
        document.addEventListener('mousedown', closeMenu);

        return ()=>{
            document.removeEventListener('mousedown', closeMenu);
        }
    }, []);

    return(
        <div className="menu--container">
            
            <nav className="nav--items">
                <div className="title--container">
                    <NavLink to='/learners-corner/' className="nav--title">Leaners Corner</NavLink>
                </div>

                <div className="l-mobile-menu-buttons-container">
                    {user?<div onClick={handleShowProfileNav} className="l-profile-image-container l-profile-image-container-mobile">
                            <img className="l-profile-image" src={`${!user?.profileImage? avatar:`${appUrl}uploads/${user?.profileImage.slice(8)}`}`} alt="profile" />
                    </div>:<></>}
                    <h3 onClick={handleMenu}  className="menu--icon">{!menu?<i className="menu-icon fa-solid fa-bars"></i>:<i class="fa-solid fa-xmark"></i>}</h3>

                </div>

                {showProfileNav?
                    <Profile setShowProfileNav={setShowProfileNav} profileRef={profileRef} user={user}/>:<></>
                    }
            
                <div  className="item--container item--container--desktop">
                    
                    <NavLink className='active item' to='/learners-corner/'>Home</NavLink>
                    <NavLink className='active item' to='/learners-corner/about'>About</NavLink>
                    <NavLink className='active item' to='/learners-corner/contact'>Contact</NavLink>
                    <NavLink className='active item' to='/learners-corner/curriculum'>Curriculum</NavLink>

                   
                </div>

                {!user?<div className="item--container item--container--desktop">
                        <NavLink className='active item' to='/learners-corner/signup'>Sign up</NavLink>
                        <NavLink className='sign-in-btn item' to='/learners-corner/signin' style={{backgroundColor:'green'}}>Sign in</NavLink>
                </div>:
                <div className="item--container item--container--desktop">
                    {user?.role === 'teacher'?<IoCreateOutline onClick={()=> navigate('/learners-corner/online/create')} className="l-create-icon"></IoCreateOutline>:<></>}
                    
                    <div onClick={handleShowProfileNav} className="l-profile-image-container">
                        <img className="l-profile-image" src={`${!user?.profileImage? avatar:`${appUrl}uploads/${user?.profileImage.slice(8)}`}`} alt="profile" />
                    </div>
                    
                    <Link to={'/learners-corner/signin'} disabled={isLoading}  onClick={signOut} className='sign-in-btn ' >Sign out</Link>
                </div>}
                
                {menu?<div ref={menuNav}  className="item--container item--container--mobile">
                    <NavLink onClick={handleClick} className='active item' to='/learners-corner/'>Home</NavLink>
                    <NavLink onClick={handleClick}  className='active item' to='/learners-corner/about'>About</NavLink>
                    <NavLink onClick={handleClick}  className='active item' to='/learners-corner/contact'>Contact</NavLink>
                    <NavLink onClick={handleClick}  className='active item' to='/learners-corner/curriculum'>Curriculum</NavLink>

                    <hr className="hr" style={{borderColor:'grey'}}/>
                    {!user?<div className="item--container mobile--extra--items">
                        <NavLink className='active item ' to='/learners-corner/signup'>Sign up</NavLink>
                        <NavLink className='sign-in-btn item' to='/learners-corner/signin' style={{backgroundColor:'green'}}>Sign in</NavLink>
                    </div>:
                     <div className="item--container mobile--extra--items">
                        {user?.role === 'teacher'? <IoCreateOutline className="l-create-icon" onClick={()=> navigate('/learners-corner/online/create')}></IoCreateOutline>:<></>}
                        <p className="active item">{user?.username}</p>
                        <Link to={'/learners-corner/signin'} disabled={isLoading} onClick={signOut} className=' sign-in-btn' >Sign out</Link>
                        
                    </div>
                    }
                    

                </div>:<></>}
                
            </nav>

          
        </div>
    )
}