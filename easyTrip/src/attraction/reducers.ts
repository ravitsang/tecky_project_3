import { IAttractionActions } from './actions'
import { IAttractionState } from './state'


const initialState = {
    attractions:[],
    isClick: false,
}

export const attractionReducer = (state:IAttractionState = initialState,action:IAttractionActions)=>{
    switch(action.type){
        case "GET_ALL_ATTRACTIONS":
            return{
                ...state,
                attractions: action.attractions,
                isClick: false
                }
        case "GET_FILTERED_ATTRACTIONS":
            return{
                ...state
            }
        case "FAILED":
            return{
                ...state
            }
        default:
            return state;
    }
}