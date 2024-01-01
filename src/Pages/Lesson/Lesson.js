import React from "react";
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getLessons} from '../../state/lessonsSlices';
import {getSubjects} from '../../state/subjectsSlice';
import parse from 'html-react-parser';
import Rating from '@mui/material/Rating';
import { IoMdPlay } from "react-icons/io";
import './Lesson.css'
import { appUrl } from "../../Helpers";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { shortenString } from "../../Helpers";
import { sortDate } from "../../Helpers";
import {getUsers} from '../../state/usersSlice'
import Loader from "../../components/Loader/Loader";

export default function Lesson(){

    const dispatch = useDispatch();
    
    const {subjectId} = useParams();
    const navigate = useNavigate();
    // const foundSubject= useSelector(state => state.subjects.data.find((sub)=> sub.title === subject));
    // const subjectId= foundSubject?._id;

    const foundLessons = useSelector(state => state.lessons.data);
    const [lessons, setLessons] = React.useState();
    const lessonStatus = useSelector(state => state.lessons.status);

    //user
    const [author, setAuthor] = React.useState('');
    const users = useSelector(state => state.users.allUsers);
    const userStatus = useSelector(state => state.users.status);

    //lesson state
    const [selectedLesson, setSelectedLesson] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [searchLessons, setSearchLessons] = React.useState();

    //side bar & menu
    const [displaySideBar, setDisplaySideBar] = React.useState(false);
    const [displayMenu, setDisplayMenu] = React.useState(false);

    function handleSelectLesson(id){
        setSelectedLesson(lessons?.filter(lesson=> lesson._id === id));
    }

    function handleChange(e){
        setSearch(e.target.value);
    }

    function handleSearch(e){
        setSearchLessons(prev =>{
            if(search.length){
                const searchString = search.split(' ').filter((s)=> s !=='').join('').toLowerCase();
                const regex = new RegExp(searchString, 'gim');

                console.log(searchString);
                const fLessons = lessons?.filter((lesson)=>{
                    const {title, subTitle} = lesson;

                    const query = (title +' '+subTitle).toLowerCase();
                    console.log(query);

                    const isMatch = query.match(regex);
                    return isMatch;
                });

                return fLessons;
            }
        })
    }

    function handleDisplaySideBar(){
        setDisplaySideBar(prev => !prev);
    }

    function handleDisplayMenu(){
        setDisplayMenu(prev => !prev);
    }

    function closeSearch(e){
        if(search.length && !e.target.classList.contains('l-lesson-search-preview')){
            setSearch('');
        }
    }
    React.useEffect(()=>{
        console.log(lessons);
        
        if(lessonStatus === 'idle'){
            dispatch(getLessons())
        }
        if(userStatus === 'idle'){
            dispatch(getUsers())
        }
        if(foundLessons.length){
            const subjectLessons = foundLessons?.filter(lesson => lesson.subjectId === subjectId);
            setLessons(subjectLessons);
            setSelectedLesson([subjectLessons[0]])
            const found = subjectLessons[0];
            setAuthor(users?.find((user)=> user?._id === found?.userId ));
        }

        

    }, [lessonStatus, dispatch, foundLessons, subjectId, userStatus, users]);

    React.useEffect(()=>{
        document.addEventListener('mousedown', closeSearch);
        
        return ()=> document.removeEventListener('mousedown', closeSearch);
    }, [])

    React.useEffect(()=>{

    }, [searchLessons, author]);
    
    if(lessonStatus ==='idle'){
        return <Loader/>
    }

    else if(!lessons?.length){
        return <p className="l-message-204">~~No Lessons Uploaded~~</p>
    }
    return(
        <div className="l-lesson-container">

            <div className="l-top-lesson-container">
                <div className="l-top-lesson-contents">
                    <p className="l-top-lesson-author-title"> <strong>Author:</strong> {author?.username}</p>

                    <div onClick={handleDisplayMenu} className="l-lesson-menu-container">
                        <IoMdMenu className="l-menu-icon"/>
                    </div>

                    <div className="top-lesson-menu-container-desktop">
                        <p > <strong>Author:</strong> {author?.username}</p>
                        <div className="l-lesson-search-container">
                            <input value={search} onChange={(e)=>{handleChange(e); handleSearch()}} className="l-lesson-search-input" type="text" placeholder="Search lesson..." />
                            <button type="button" onClick={handleSearch} className=" l-lesson-search-btn">Search</button>

                            {search.length?<div className="l-lesson-search-preview">
                                {
                                    searchLessons?.map((lesson)=>{
                                        const {title, _id} = lesson
                                        return(
                                            <p onClick={()=>{ handleSelectLesson(lesson?._id); setSearch('')}} key={lesson?._id} className="l-lesson-preview-title">{title}</p>
                                        )
                                    })
                                }
                                
                        </div>:<></>}
                        </div>

                        <div className="l-lesson-stats">
                            <Rating name="half-rating-read-only" value={2} precision={0.5} readOnly  />
                        </div>

                    </div>

                    {displayMenu?<div className="top-lesson-menu-container-mobile">
                        <div className="l-lesson-search-container">
                            <input value={search} onChange={(e)=>{handleChange(e); handleSearch()}} className="l-lesson-search-input" type="text" placeholder="Search lesson..." />
                            <button type="button" onClick={handleSearch} className=" l-lesson-search-btn">Search</button>

                            {search?.length?<div className="l-lesson-search-preview">
                                {
                                    searchLessons?.map((lesson)=>{
                                        const {title, _id} = lesson
                                        return(
                                            <p onClick={()=>{ handleSelectLesson(lesson?._id); setSearch('')}} key={lesson?._id} className="l-lesson-preview-title">{title}</p>
                                        )
                                    })
                                }
                                
                        </div>:<></>}
                        </div>

                        <div className="l-lesson-stats">
                            <Rating name="half-rating-read-only" value={2} precision={0.5} readOnly  />
                        </div>

                    </div>:<></>}

            

                </div>

                <div className="l-top-bottom-lesson-contents">
                    <div onClick={handleDisplaySideBar} className="l-side-bar-icon-container">
                        <BsLayoutTextSidebar className="l-side-car-icon"/>
                    </div>

                    <button onClick={()=>navigate(`/learners-corner/online/quiz/${subjectId}`)} className="l-play-quiz-btn"> <IoMdPlay/> Play Quiz</button>
                </div>
                
            </div>

            <div className="l-left-lesson-container l-left-lesson-container-desktop">

                <ul className="l-lessons-nav">
                    {lessons?.length? (lessons)?.map((lesson)=>{
                            const {title, _id} = lesson;
                        return(
                            <li key={lesson?._id} onClick={()=> handleSelectLesson(_id)} className={`l-lesson-title ${selectedLesson[0]?._id === _id? 'active-lesson':''}`}>{shortenString(title)} <span>Author</span></li>
                        )
                    }):[]}
                </ul>
            </div>

            {displaySideBar?<div className="l-left-lesson-container l-left-lesson-container-mobile">

                <ul className="l-lessons-nav">
                    {sortDate(lessons)?.map((lesson)=>{
                            const {title, _id} = lesson;
                        return(
                            <li key={lesson?._id} onClick={()=> handleSelectLesson(_id)} className={`l-lesson-title ${selectedLesson[0]?._id === _id? 'active-lesson':''}`}>{shortenString(title)} <span>Author</span></li>
                        )
                    })}
                </ul>
            </div>:<></>}

            <div className="l-middle-lesson-container">
                {selectedLesson?.map((lesson)=>{
                    const{title, _id, backgroundImage} = lesson;
                    
                    const reactElements = parse(lesson?.contents? lesson?.contents:'');
                    const image = backgroundImage?.slice(8)
                    return(
                        <div key={_id} className="l-lesson-contents">
                            <div className="l-lesson-title-container">
                                <div className="l-lesson-background-overlay"></div>
                                <h1 className="l-lesson-content-title">{title}</h1>
                                <img className="l-lesson-background-image" src={`${appUrl}uploads/${image}`} alt="lesson" />
                            </div>
                            
                            <br />
                            {reactElements}
                        </div>
                    )
                })}

                <div className="l-middle-nav">
                    {/* lesson navigation */}
                </div>
            </div>

            <div className="l-right-lesson-container">
                <div className="l-right-in-lesson-container">
                    <h3 className="l-in-lesson-title">In this lesson</h3><br />
                    <ul>
                        <li>Where to start</li>
                        <li>Topics covered</li>
                        <li>Tasks and assessments</li>
                        <li>Contact us</li>
                        <li>See also</li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}