import axios from "axios";
import { useDispatch } from "react-redux";

export const appUrl = process.env.REACT_APP_URL;
export const frontendUrl = process.env.REACT_APP_FRONT_END_URL;


export const logOut = async()=>{
    try {
        const response = await axios.get(`${appUrl}user/signout`, {withCredentials:true});
        const {data} = response;
        return data;
        
    } catch (error) {
        console.log(error)
    }
}
export function shortenString(string){
    if(string?.length > 28){
        return string.substring(0, 28)+'...'
    }else{
        return string;
    }
}

export function sortDate(arr){
    return arr?.slice().sort((a, b)=> b.createdAt.localeCompare(a.createdAt));
}