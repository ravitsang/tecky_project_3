export interface IScheduleItem{
    id: number
    attractionId:number
    name:string
    description: string
    location: string
    telephone: string
    url: string
    attraction_image: string
    type: string
}

export interface IScheduleItemState{
    scheduleItems: IScheduleItem[]
}