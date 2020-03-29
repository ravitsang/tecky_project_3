import { IScheduleItem } from "./state"
import { IAttraction } from "../attraction/state"


export function getAllScheduleItems(scheduleItems:IScheduleItem[]){
    return{
        type: "GET_ALL_SCHEDULE_ITEMS" as "GET_ALL_SCHEDULE_ITEMS",
        scheduleItems
    }
}

export function createScheduleItem(attraction:IAttraction){
    return{
        type: "CREATE_SCHEDULE_ITEM" as "CREATE_SCHEDULE_ITEM",
        attraction
    }
}

export function deleteScheduleItem(scheduleItemId:number){
    return{
        type: "DELETE_SCHEDULE_ITEM" as "DELETE_SCHEDULE_ITEM",
        scheduleItemId
    }
}

export function failed(msg:string){
    return{
        type: "FAILED" as "FAILED",
        msg
    }
}

type actionCreators = typeof getAllScheduleItems |
                        typeof createScheduleItem |
                        typeof deleteScheduleItem |
                        typeof failed

export type IScheduleItemActions = ReturnType<actionCreators>