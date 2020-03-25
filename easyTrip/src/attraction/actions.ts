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

export function failed(msg:string){
    return{
        type: "FAILED" as "FAILED",
        msg
    }
}


type actionCreators = typeof getAllAttractions |
                        typeof getFilteredAttraction |
                        typeof failed

export type IAttractionActions = ReturnType<actionCreators>