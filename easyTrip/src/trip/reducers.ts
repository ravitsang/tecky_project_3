import { ITripState } from './state';
import { ITripActions } from './actions';

const initialState = {

    tripDetail:localStorage.getItem("tripDetail") ? JSON.parse(localStorage.getItem("tripDetail") || "{}") : "{}"
}


export const tripReducer = (state:ITripState = initialState, action:ITripActions) =>{



}