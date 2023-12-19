import { createSlice, createAsyncThunk , createSelector} from "@reduxjs/toolkit";
import axios from "axios";
import { appUrl } from "../Helpers";

export const getUsers = createAsyncThunk('users/getUsers', async()=>{
    try {
        const response = await axios.get(`${appUrl}users`);
        const {data} = response;
        return data;
        
    } catch (error) {
        console.log(error);
    }
});

export const getLoggedInUser = createAsyncThunk('users/getLoggedInUser', async(token)=>{
    try {
        const response = await axios.get(`${appUrl}user`, {
            withCredentials:true,
            headers:{
                Authorization:'bearer '+token
            }
        });

        const {data} = response;
        console.log(data);
        return data;
        
    } catch (error) {
        console.log(error);
    }
})


let initialState = {
    user:null,
    token:'',
    persist:false,
    allUsers:[],
    status:'idle',
    error:null
}
const usersSlice = createSlice({
    initialState,
    name:'users',
    reducers:{
        setToken:(state, action)=>{
            state.token = action.payload;
        },

        getToken:(state)=>{
            return state.token;
        },

        setUser:(state, action)=>{
            state.user = action.payload
        }
    },
    extraReducers(build){
        build.addCase(getUsers.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.allUsers = action.payload;
        })
        .addCase(getLoggedInUser.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.user = action.payload;
        });
        
    }
});


const allUsers = (state)=> state.data;
const userId = (state, itemId )=> itemId;
const user = (state)=> state.user;
export const selectUser= createSelector([user], (loggedUser)=> loggedUser);
export const selectLessonById = createSelector([allUsers, userId], (users, userId)=> users[userId]);
export const selectAllUsers =createSelector([allUsers], (users)=> users);

export const {setToken, setUser} = usersSlice.actions;

export default usersSlice.reducer;