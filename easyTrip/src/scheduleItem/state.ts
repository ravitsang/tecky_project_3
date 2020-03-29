export interface IScheduleItem{
    id: number
    attractionId:number
    name:string
    type: string
}

export interface IScheduleItemState{
    scheduleItems: IScheduleItem[]
}