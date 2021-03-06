export interface IAttraction{
    id: number
    tag: string
    attraction_image: string
    city_name: string
    name: string
    description: string
    location: string
    telephone: string
    url:string
    isClick: boolean
    lat:number
    lng:number
}

export interface IAttractionState{
    attractions: IAttraction[]
}
