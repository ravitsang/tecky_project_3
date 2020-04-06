import { IAttraction } from './state'

export function getAllAttractions(attractions:IAttraction[]){
    return{
        type: "GET_ALL_ATTRACTIONS" as "GET_ALL_ATTRACTIONS",
        attractions
    }
}

export function getFilteredAttraction(tagId:number,attractions:IAttraction[]){
    return{
        type: "GET_FILTERED_ATTRACTIONS" as "GET_FILTERED_ATTRACTIONS",
        tagId,
        attractions
    }
}

export function addAttraction(attractionId:number){
    return{
        type: "ADD_ATTRACTION" as "ADD_ATTRACTION",
        attractionId
    }
}

export function getLatLng(lat:number,lng:number){
    return{
        type: "GET_LAT_LNG" as "GET_LAT_LNG",
        lat,
        lng
    }
}

export function failed(msg:string){
    return{
        type: "FAILED" as "FAILED",
        msg
    }
}


type actionCreators = typeof getAllAttractions |
                        typeof addAttraction |
                        typeof getFilteredAttraction |
                        typeof getLatLng |
                        typeof failed

export type IAttractionActions = ReturnType<actionCreators>