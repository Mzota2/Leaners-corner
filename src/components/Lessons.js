import React from "react";
import LessonsData from "./LessonsData";
import {NavLink} from 'react-router-dom'

export default function Lessons(){
    const [lessonData , setLessonData]= React.useState(LessonsData);
    console.log(lessonData);
    const [searchValue, setSearchValue] = React.useState({
        search:'',
        toggleDisplay:true

    });
    const handleChange = function (e){
        setSearchValue(prevSearch =>{
            const {name, value }= e.target;
            return{
                ...prevSearch,
                [name]:value,
                
            }
        });
    }
    //lets render data on conditioon

   

    function handleSearch(){
        setLessonData(prevData =>{
            prevData = LessonsData;

            const newData = prevData.filter((data)=>{

                var searchInput = searchValue.search;
                var tokens = searchInput.toString().toLowerCase().split(' ').filter(token =>{
                    return token.trim() !== '';
                })
                const toenified = tokens.join(' ');

                if(tokens.length){
                    var regex = new RegExp(toenified, 'gim');
                }
                var myData = data.title.toLowerCase() +' '+ data.description.toLowerCase();
                console.log(myData);

                
                return myData.match(regex);
               

                
            })
            return newData;
        })
    }
    function reset(){
        setLessonData(prevData=>{
            searchValue.search = '';
            return LessonsData;
           
        })
    }
 
   
    const styles={
        width:250,
        height:200,
        marginLeft:20,
        marginRight:20
    }
     const data =lessonData.map((lesson)=>{ 
         const level = lesson.title.split(' ');
         const main = lesson.title.split(' ');
         console.log(main);
         const MainTitle = main.splice(0 ,2).join(' ');
         console.log(MainTitle);
         const classLevel = level.slice(level.length-1);
         console.log(classLevel);
        return(
            <NavLink className='on--text' to={lesson.link}>
                <div style={styles} className="lesson">
                <img className="lesson--image" src={lesson.image} alt='lesson'></img>
                <div className="context--container">
                   
                   <NavLink className='subject--link' to={lesson.link} ><h3 className="lesson--title">{MainTitle}       <span className="on--level">{classLevel}</span>   </h3></NavLink>
                    <p className="lesson--description">{lesson.description}</p>
                </div>
                
            </div>
            </NavLink>
        )
    }) 
    return(
        <div>
            <div className="header--container">
                <h3 onClick={reset} className="header--title">Lessons and Quizzes</h3>
                <div className="input--container">
                    <i class="searchIcon fa-solid fa-magnifying-glass"></i>
                    <input onChange={handleChange} value={searchValue.search} name="search"className="search--input"  type='text'></input>
                    <button onClick={handleSearch} className="button--search">Search</button>
                </div>
                
            </div>

            <div className="lessons--container">
                {data}
            </div>

            <hr style={{marginTop:20}} className="footer--line" />
            <div className="footer--container">
                
                <h3 className="footer--title">Learners corner.</h3>
                <div className="footer--bottom">
                    <p className="copy">© 2022 Mzota . All rights reserved</p>
                    <div className="social--icons">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-instagram-square"></i>
                    <i class="fab fa-youtube"></i>
                </div>

                </div>
                
         
            </div>
        </div>
      
    )
}