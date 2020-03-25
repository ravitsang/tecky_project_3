import { ThunkDispatch } from '../store'
import { createScheduleItem, failed, deleteScheduleItem, getAllScheduleItems } from "./actions";

const REACT_APP_API_SERVER = process.env

export function getAllScheduleItemsThunk(){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/schedule`);
        const result = await res.json();

        if(result.success){ 
            dispatch(getAllScheduleItems(result.data));
        }else{
            dispatch(failed(result.msg));
        }
    }
}

export function createScheduleItemThunk(){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/schedule`,{
            method: "POST"
        });
        const result = await res.json();

        if(result.success){ 
            dispatch(createScheduleItem(result.data.id));
        }else{
            dispatch(failed(result.msg));
        }
        
    }
}

export function deleteScheduleItemThunk(scheduleItemId:number){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/schedule/${scheduleItemId}`,{
            method: "DELETE"
        });
        const result = await res.json();

        if(result.success){
            dispatch(deleteScheduleItem(scheduleItemId));
        }else{
            dispatch(failed(result.msg));
        }        
    }
}