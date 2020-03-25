export interface IAttraction{
    id: number
    tag: string
    attractionImage: string
    city: string
    name: string
    description: string
    location: string
    telephone: string
    url:string
}

export interface IAttractionState{
    attractions: IAttraction[],
    isClick: boolean
}
