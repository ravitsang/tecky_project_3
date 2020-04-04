import { ThunkDispatch } from "../store";
import { getDriving, failed } from "./actions";

const {REACT_APP_API_SERVER} = process.env

export function getDrivingThunk(origin:string,destination:string){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.REACT_APP_GOOGLE_KEY}`);
        const result = await res.json();
        console.log(result);
        if(result.status === "OK"){
            const duration = result.routes.legs.duration.text;
            dispatch(getDriving(duration));
        }else{
            dispatch(failed(result.msg))
        }
        console.log(result)
    }
}

export function getTransitThunk(origin:string,destination:string,departureTime:number){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=${departureTime}&mode=transit&key=${process.env.REACT_APP_GOOGLE_KEY}`);
        const result = await res.json();
        if(result.status === "OK"){
            const duration = result.routes.legs.duration.text;
        }
        console.log(result)
    }
}
