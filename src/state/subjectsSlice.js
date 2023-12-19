import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from 'axios';
import { appUrl } from "../Helpers";

export const getSubjects = createAsyncThunk('subjects/getSubjects', async()=>{
    try {
        const response = await axios.get(`${appUrl}subjects`);
        const {data} = response;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
});
const initialState = {
    data:[],
    status:'idle',
    error:null
}
const subjectsSlice = createSlice({
    name:'subjects',
    initialState,
    reducers:{
        createSubject:(state, action)=>{

        },

        updateSubject:(state, action)=>{

        },


    },
    extraReducers(build){
        build.addCase(getSubjects.pending, (state, action)=>{
            state.status = 'loading';
        })

        .addCase(getSubjects.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            console.log('done')
            state.data = state.data.concat(action.payload);
        })

        .addCase(getSubjects.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error;
        });
    }

});

const allSubjects = (state)=> state.data;
const subjectId = (state, itemId )=> itemId;
const status = (state)=>state.status;
export const selectSubjectStatus = createSelector([status], (stt)=> stt);
export const selectSubjectById = createSelector([allSubjects, subjectId], (subjects, subjectId)=> subjects[subjectId]);
export const selectAllSubjects =createSelector([allSubjects], (subjects)=> subjects);
export const {createSubject, updateSubject} = subjectsSlice.actions;
export default subjectsSlice.reducer;