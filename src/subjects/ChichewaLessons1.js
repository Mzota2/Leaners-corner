import React from "react";
import { ChiLessonsData } from "../subjectData/chichewaData";

import './history.css'

export default function ChichewaLessons(){
    const [historyData , setHistoryData] = React.useState(ChiLessonsData);
    const[currentIndex , setCurrentIndex] = React.useState(0);
    const [formData , setFormData] = React.useState({
        level:''

    })
    console.log(formData.level);
    function handleLevel(e){
        setFormData(prevData =>{
        
            const {name , value} = e.target;
            return{
                ...prevData,
                [name]:value

            }
        })
    }

    function handleClick(){
        if(formData.level === 'all'){
            setHistoryData(ChiLessonsData);
        }
       if(formData.level === 'form1'){
           
           setHistoryData(prevData =>{
                prevData = ChiLessonsData;
               const newData = prevData.filter(data =>{
                   const form = 'form 1';
                   return data.form.match(form)
               })
               if(newData.length ===0){
                return prevData;
            }else{
                return newData;
            }
           })

       }
       if(formData.level ==='form2'){
           setHistoryData(prevData =>{
            prevData = ChiLessonsData;
               const newData = prevData.filter(data =>{
                   const form ='form 2';
                   return data.form.match(form)
               })
               if(newData.length ===0){
                   return prevData;
               }else{
                   return newData;
               }
           })
       }
       if(formData.level ==='form3'){
        setHistoryData(prevData =>{
            prevData = ChiLessonsData;
            const newData = prevData.filter(data =>{
                const form ='form 3';
                return data.form.match(form)
            })
            if(newData.length ===0){
                return prevData;
            }else{
                return newData;
            }
        })
    }
    if(formData.level ==='form4'){
        setHistoryData(prevData =>{
            prevData = ChiLessonsData;
            const newData = prevData.filter(data =>{
                const form ='form 4';
                return data.form.match(form)
            })
            if(newData.length ===0){
                return prevData;
            }else{
                return newData;
            }
        })
    }
    if(formData.level ==='primary'){
        setHistoryData(prevData =>{
            prevData = ChiLessonsData;
            const newData = prevData.filter(data =>{
                const form ='primary';
                return data.form.match(form)
            })
            if(newData.length ===0){
                return prevData;
            }else{
                return newData;
            }
        })
    }
    }

    function handleNext(){
        setCurrentIndex(currentIndex + 1)

        if(currentIndex >=  historyData.length-1){
            setCurrentIndex(0);
        }
    }
    function handlePrevious(){
        setCurrentIndex(currentIndex -1 )
        if(currentIndex <= 0){
            setCurrentIndex(0);
        }
    }    function toggleOff(){
        setTopic(false);
    }
    const [topic , setTopic]= React.useState(false);

    function handleTopic(){
      setTopic(!topic);
    }

    const data = historyData.map(lesson =>{
        function showLesson(){
            setTopic(false);
           setCurrentIndex(historyData.indexOf(lesson));

        }
       
        return (
            <div>
                <p onClick={showLesson} className="hs--lessons" key={lesson.id}>{lesson.title} <i class=" fab fas fa-angle-double-right"></i></p>

            </div>
        )
    })
    return(
        <div>
            <div className="hs--lessons--grid--container">
                <div className="hs--select--menu">
                <h3 onClick={handleTopic} className="hs--header--title"><i class="fa-solid fa-bars"></i>Topics</h3>
                    <select className="hs--select--menu--container" onClick={handleClick} onChange={handleLevel} value={formData.level} name="level">
                        <option value='all'>All</option>
                        <option value='form1'>Form 1</option>
                        <option value= 'form2'>Form 2</option>
                        <option value= 'form3' >Form 3</option>
                        <option value='form4'>Form 4</option>
                        <option value='primary' >Primary School</option>
                    </select>

                </div>
            

                {window.innerWidth <= 700 ? topic?<p className="hs--lessons--grid">{data}</p>:console.log('we'):<p className="hs--lessons--grid">{data}</p>}

                <div onClick={toggleOff} className="hs--lessons--grid--contents">
                    <h1 className="hs--lesson--title">{historyData[currentIndex].title}</h1>
                    <div className="hs--navigatio--buttons">
                        <p onClick={handlePrevious} className="hs--lessons--previous">Previous</p>
                        <p onClick={handleNext} className="hs--lessons--next">Next</p>

                    </div>
                   
                    <div className="hs--lesson--contents">
                        <p className="hs--lesson--display">{historyData[currentIndex].description}</p>

                    </div>
                </div>
                
            </div>
           
        </div>
    )
}