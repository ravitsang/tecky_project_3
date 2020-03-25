import { ITrip, IDaysInfor } from "./state"

type actionCreators = typeof getTripDetail | 
                      typeof storeDays |
                      typeof moveEvent |
                      typeof resizeEvent |
                      typeof addEvent |
                      typeof addExternalEvent |
                      typeof deleteExternalEventList

export type ITripActions = ReturnType<actionCreators>


export function getTripDetail (tripdetail:ITrip){

    return{
        type: "GET_TRIPDETAIL" as "GET_TRIPDETAIL",
        tripdetail: tripdetail
    }

}


export function storeDays (dayInfor:IDaysInfor[]){

    return{
        type: "STORE_DAYS" as "STORE_DAYS",
        daysInfor: dayInfor
    }

}


export function moveEvent (info:any){

    return{
        type: "MOVE_EVENT" as "MOVE_EVENT",
        info: info
    }

}


export function resizeEvent (info:any){

    return{
        type: "RESIZE_EVENT" as "RESIZE_EVENT",
        info: info
    }

}

export function addEvent (info:any){

    return{
        type: "ADD_EVENT" as "ADD_EVENT",
        info: info
    }

}


export function addExternalEvent (info:any){

    return{
        type: "ADD_EXTERNAL_EVENT" as "ADD_EXTERNAL_EVENT",
        info: info
    }

}

export function deleteExternalEventList (info:any){

    return{
        type: "DELETE_EXTERNAL_EVENT_LIST" as "DELETE_EXTERNAL_EVENT_LIST",
        info: info
    }

}