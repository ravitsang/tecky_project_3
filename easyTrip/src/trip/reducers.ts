import { ITripState } from './state';
import { ITripActions } from './actions';

const initialState = {

    tripDetail: localStorage.getItem("tripDetail") ? JSON.parse(localStorage.getItem("tripDetail") || "{}") : "{}",
    daysInfor: {
        month: "",
        days: []
    }
}


export const tripReducer = (state: ITripState = initialState, action: ITripActions) => {

    switch (action.type) {

        case "GET_TRIPDETAIL":

            console.log(state);
            return {
                ...state
            }

        case "STORE_DAYS":

            console.log(action.daysInfor);
            return {
                ...state,
                days: action.daysInfor
            }

        default:
            console.log(action);
            return state
    }

}