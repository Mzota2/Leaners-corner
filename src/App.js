import React from 'react';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import {Routes , Route, useLocation} from 'react-router-dom';
import Contact from './Pages/Contact/Contact';
import Curriculum from './Pages/Curriculum/Curriculum';
import Error from './components/Error';
import Subjects from './Pages/Subjects/Subjects';
import Lesson from './Pages/Lesson/Lesson';
import Quiz from './Pages/Quiz/Quiz';


import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp';
import EditLesson from './Pages/Creator/EditLesson';
import EditQuiz from './Pages/Creator/EditQuiz';
import EditSubject from './Pages/Creator/EditSubject';

import Creator from './Pages/Creator/Creator';
import Verify from './Pages/Verify/Verify';
import DashBoard from './DashBoard';
import PersistLogin from './PersistLogin';
import Role from './Role';
import Settings from './Pages/Settings/Settings';

import { useDispatch, useSelector } from 'react-redux';
import { getSubjects } from './state/subjectsSlice';
import { getLessons } from './state/lessonsSlices';
import { getQuizzes } from './state/quizzesSlice';
import Protected from './Protected';


function App(props) {
  const dispatch = useDispatch();
  const subjectsStatus = useSelector(state => state.subjects.status);
  const lessonsStatus = useSelector(state => state.lessons.status);
  const quizzesStatus = useSelector(state => state.quizzes.status);

  const location = useLocation();

  React.useEffect(()=>{
  });
  return (
    
    <div>
      
      <Routes>
        <Route path='/' element={<DashBoard/>}>

          <Route path={'/'} element={<PersistLogin/>}>

            <Route exact path="/learners-corner/" element={<Home/>}/>
            <Route path='/learners-corner/about' element={<About/>}/>
            <Route path='/learners-corner/contact' element={<Contact/>}/>
            <Route path='/learners-corner/curriculum' element={<Curriculum/>}/>
            <Route path='/learners-corner/online/lesson/:subjectId' element={<Lesson/>}/>
            <Route path='/learners-corner/online/subjects' element={<Subjects/>} />
            <Route path='/learners-corner/online/quiz/:subjectId' element={<Quiz/>} />
            


            <Route path='/learners-corner/user/confirm/:token' element={<Verify/>} />
            
            <Route path='/' element={<Protected/>} >

              {/* teacher routes */}
              <Route path='/' element={<Role/>}>
                <Route path='/learners-corner/online/create' element={<Creator/>} />
                <Route path='/learners-corner/edit/quiz/:id' element={<EditQuiz/>} />
                <Route path='/learners-corner/edit/subject/:id' element={<EditSubject/>} />
                <Route path='/learners-corner/edit/lesson/:id' element={<EditLesson/>} />
              </Route>


              {/* protected routes */}
              <Route path='/learners-corner/user/settings' element={<Settings/>} />
              
            </Route>
            
           
        
            <Route path='*' element={<Error/>}/>
          </Route>
        </Route>

        <Route path='/learners-corner/signin' element={<SignIn/>}/>
        <Route path='/learners-corner/signup' element={<SignUp/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
