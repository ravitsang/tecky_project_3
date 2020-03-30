import { IAttractionActions } from './actions'
import { IAttractionState } from './state'


const initialState = {
    attractions:[]
}

export const attractionReducer = (state:IAttractionState = initialState,action:IAttractionActions)=>{
    switch(action.type){
        case "GET_ALL_ATTRACTIONS":
            return{
                ...state,
                attractions: action.attractions
                }
        case "GET_FILTERED_ATTRACTIONS":
            return{
                ...state
            }
        case "ADD_ATTRACTION":
            return{
                ...state,
                attractions: state.attractions.map(attraction =>{
                    if(attraction.id === action.attractionId ){
                        return {
                            ...attraction,
                            isClick: !attraction.isClick
                        }
                    }else{
                        return attraction
                    }
                })
            }
        case "GET_LAT_LNG":
            return{
                ...state,
                attractions: state.attractions.map(attraction =>{
                        return {
                            ...attraction,
                            lat: action.lat,
                            lng: action.lng
                        }

                })
            }
        case "FAILED":
            return{
                ...state
            }
        default:
            return state;
    }
}