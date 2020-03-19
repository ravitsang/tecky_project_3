import { ITrip } from "./state"

type actionCreators = typeof getTripDetail


export type ITripActions = ReturnType<actionCreators>


export function getTripDetail (tripdetail:ITrip){

    return{
        type: "GET_TRIPDETAIL" as "GET_TRIPDETAIL",
        tripdetail: tripdetail
    }


}
