import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from 'axios';
import { appUrl } from "../Helpers";
export const getQuizzes = createAsyncThunk('quizzes/getQuizzes', async()=>{
    try {
        const response = await axios.get(`${appUrl}quizzes`);
        const {data} = response;
        console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
    }
})
const initialState ={
    data:[],
    status:'idle',
    error:null,
}
const quizzesSlice = createSlice({
    name:'quizzes',
    initialState,
    reducers:{},
    extraReducers(build){
        build
        .addCase(getQuizzes.fulfilled, (state, action)=>{
            state.data = action.payload;
            state.status = 'succeeded';
        })
        .addCase(getQuizzes.rejected, (state, action)=>{
            state.error = action.error;
            state.status = 'failed';
        })
    }
});



const allQuizzes = (state)=> state.data;
const quizId = (state, itemId )=> itemId;
export const selectLessonById = createSelector([allQuizzes, quizId], (quizs, quizId)=> quizs[quizId]);
export const selectAllQuizzes =createSelector([allQuizzes], (quizs)=> quizs);
export default quizzesSlice.reducer;

