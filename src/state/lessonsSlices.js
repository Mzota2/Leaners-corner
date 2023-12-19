import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { appUrl } from "../Helpers";

export const getLessons = createAsyncThunk('lessons/getLessons', async()=>{
    try {
        const response = await axios.get(`${appUrl}lessons`);
        const {data} = response;
        return data?.slice().sort((a, b)=> b.createdAt.localeCompare(a.createdAt));
    } catch (error) {
        console.log(error);
    }
})
const initialState ={
    data:[],
    status:'idle',
    error:null
}

const lessonsSlice = createSlice({
    name:'lessons',
    initialState,
    reducers:{
    },
    extraReducers(build){
        build.addCase(getLessons.fulfilled, (state, action)=>{
            console.log('executing get lessons')
            state.data = action.payload;
            state.status = 'succeeded';
        })
        .addCase(getLessons.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error;
        })
    }
});

const allLessons = (state)=> state.data;
const lessonId = (state, itemId )=> itemId;
export const selectLessonById = createSelector([allLessons, lessonId], (lessons, lessonId)=> lessons[lessonId]);
export const selectAllLessons =createSelector([allLessons], (lessons)=> lessons);

export default lessonsSlice.reducer;