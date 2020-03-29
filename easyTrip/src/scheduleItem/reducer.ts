import { IScheduleItemState } from "./state"
import { IScheduleItemActions } from "./actions"

const initialState = {
    scheduleItems: localStorage.getItem('scheduleItems') 
                    ? JSON.parse(localStorage.getItem('scheduleItems') || '[]') 
                    :[]
}

export const scheduleItemReducer = (state:IScheduleItemState = initialState,action:IScheduleItemActions)=>{
    switch(action.type){
        case "GET_ALL_SCHEDULE_ITEMS":
            return{
                ...state
            }
        case "CREATE_SCHEDULE_ITEM":
            return{
                ...state,
                scheduleItems: state.scheduleItems.concat([{
                    id: state.scheduleItems.length + 1,
                    attractionId: action.attraction.id,
                    name: action.attraction.name,
                    type: "attraction"
                }])
            }
        case "DELETE_SCHEDULE_ITEM":
            return{
                ...state,
                scheduleItems: state.scheduleItems.filter(
                    scheduleItem=> scheduleItem.id !== action.scheduleItemId)
            }
        default:
            return state;
    }
}