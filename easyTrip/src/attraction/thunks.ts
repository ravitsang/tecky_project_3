import { ThunkDispatch } from '../store';
import { getAllAttractions, getFilteredAttraction, failed } from './actions'

const {REACT_APP_API_SERVER} = process.env

export function getAllAttractionsThunk(){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/attraction`);
        const result = await res.json();

        
        console.log(result);
        if(result.success){ 
            dispatch(getAllAttractions(result.data.rows));
        }else{
            dispatch(failed(result.msg));
        }
    }
} 

export function getFilteredAttractionThunk(tagId:number){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/attraction/${tagId}`);
        const result = await res.json();
        
        if(result.success){ 
            dispatch(getFilteredAttraction(tagId,result.data));
        }else{
            dispatch(failed(result.msg));
        }
    }
}