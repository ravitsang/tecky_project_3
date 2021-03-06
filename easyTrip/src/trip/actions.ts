import { ITrip, IDaysInfor } from "./state"
import { IAttraction } from "../attraction/state"

type actionCreators = typeof getTripDetail |
    typeof storeDays |
    typeof moveEvent |
    typeof resizeEvent |
    typeof addEvent |
    typeof addExternalEvent |
    typeof updateExternalEvent |
    typeof deleteExternalEventList |
    typeof displayEventClick |
    typeof addStartEndEvent |
    typeof updateConstraint |
    typeof getDriving |
    typeof resetDriving |
    typeof getTransit |
    typeof failed

export type ITripActions = ReturnType<actionCreators>


export function getTripDetail(tripdetail: ITrip) {

    return {
        type: "GET_TRIPDETAIL" as "GET_TRIPDETAIL",
        tripdetail: tripdetail
    }

}


export function storeDays(dayInfor: IDaysInfor[]) {

    return {
        type: "STORE_DAYS" as "STORE_DAYS",
        daysInfor: dayInfor
    }

}


export function moveEvent(info: any) {

    return {
        type: "MOVE_EVENT" as "MOVE_EVENT",
        info: info
    }

}


export function resizeEvent(info: any) {

    return {
        type: "RESIZE_EVENT" as "RESIZE_EVENT",
        info: info
    }

}

export function addEvent(info: any, values:any) {

    return {
        type: "ADD_EVENT" as "ADD_EVENT",
        info: info,
        eventDetail: values
    }

}


export function updateExternalEvent(attraction: IAttraction) {

    return {
        type: "UPDATE_EXTERNAL_EVENT" as "UPDATE_EXTERNAL_EVENT",
        attraction: attraction
    }

}



export function addExternalEvent(info: any) {

    return {
        type: "ADD_EXTERNAL_EVENT" as "ADD_EXTERNAL_EVENT",
        info: info
    }

}

export function deleteExternalEventList(info: any) {

    return {
        type: "DELETE_EXTERNAL_EVENT_LIST" as "DELETE_EXTERNAL_EVENT_LIST",
        info: info
    }

}

// need to edit later
export function displayEventClick(info: any) {

    return {
        type: "DISPLAY_EVENT_CLICK" as "DISPLAY_EVENT_CLICK",
        info: info
    }

}

export function addStartEndEvent() {

    console.log('addStartEndTime');
    return {
        type: "ADD_START_END_TIME" as "ADD_START_END_TIME"
    }

}

export function updateConstraint(eventId: number) {

    // console.log('addStartEndTime');
    return {
        type: "UPDATE_CONSTRAINT" as "UPDATE_CONSTRAINT",
        eventId: eventId
    }

}

export function getDriving(duration:string){
    return{
        type: "GET_DRIVING" as "GET_DRIVING",
        duration
    }
}


export function resetDriving(){
    return{
        type: "RESET_DRIVING" as "RESET_DRIVING"
    }
}

export function getTransit(duration:string){
    return{
        type: "GET_TRANSIT" as "GET_TRANSIT",
        duration
    }
}

export function failed(msg:string){
    return{
        type: "FAILED" as "FAILED",
        msg
    }
}