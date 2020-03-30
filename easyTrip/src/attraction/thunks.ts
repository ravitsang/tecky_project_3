import { ThunkDispatch } from '../store';
import { getAllAttractions, getFilteredAttraction, failed, getLatLng } from './actions'

const {REACT_APP_API_SERVER} = process.env

export function getAllAttractionsThunk(){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/attraction`);
        const result = await res.json();

        
        console.log(result);
        if(result.success){ 
            dispatch(getAllAttractions(result.data));
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

export function getLatLngThunk(address:string){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_KEY}`);
        const result = await res.json();
        if(result.status === "OK"){
            const lat = result.results[0].geometry.location.lat;
            const lng = result.results[0].geometry.location.lng;
            dispatch(getLatLng(lat,lng));
        }else {
            dispatch(failed(result.msg));
        }
    }
}

export function getDirectionThunk(origin:string,destination:string){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.REACT_APP_GOOGLE_KEY}`);
        const result = await res.json();
        console.log(result)
    }
}