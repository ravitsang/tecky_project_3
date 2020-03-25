import { ITrip, IDaysInfor } from "./state"

type actionCreators = typeof getTripDetail | typeof storeDays


export type ITripActions = ReturnType<actionCreators>


export function getTripDetail (tripdetail:ITrip){

    return{
        type: "GET_TRIPDETAIL" as "GET_TRIPDETAIL",
        tripdetail: tripdetail
    }

}


export function storeDays (dayInfor:IDaysInfor){

    return{
        type: "STORE_DAYS" as "STORE_DAYS",
        daysInfor: dayInfor
    }


}
