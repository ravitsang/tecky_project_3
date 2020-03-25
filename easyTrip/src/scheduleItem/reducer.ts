import { IScheduleItemState } from "./state"
import { IScheduleItemActions } from "./actions"

const initialState = {
    scheduleItems: []
}

export const scheduleItemReducer = (state:IScheduleItemState = initialState,action:IScheduleItemActions)=>{
    switch(action.type){
        case "GET_ALL_SCHEDULE_ITEMS":
            return{
                ...state,
                scheduleItems: action.scheduleItems
            }
        case "CREATE_SCHEDULE_ITEM":
            return{
                ...state,
                // scheduleItems: state.scheduleItems.concat([{
                //     id: action.scheduleItemId,
                //     tripId: null,
                //     attractionId: null,
                //     name: null,
                //     description: null,
                //     start_time: null,
                //     end_time: null,
                //     location: null,
                //     type: null
                // }])
            }
        case "DELETE_SCHEDULE_ITEM":
            return{
                ...state,
                scheduleItems: state.scheduleItems.map(scheduleItem=>{
                    if(action.scheduleItemId){
                        return{
                            ...scheduleItem
                        }
                    }else{
                        return scheduleItem;
                    }
                })
            }
        default:
            return state;
    }
}