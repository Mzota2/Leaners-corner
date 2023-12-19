import {configureStore} from '@reduxjs/toolkit';
import subjectsReducer from './state/subjectsSlice';
import lessonsSlices from './state/lessonsSlices';
import quizzesSlice from './state/quizzesSlice';
import usersSlice from './state/usersSlice';
export default configureStore({
    reducer:{
        subjects:subjectsReducer,
        users:usersSlice,
        quizzes:quizzesSlice,
        lessons:lessonsSlices
    }
});

