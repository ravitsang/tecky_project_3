export interface IScheduleItem{
    id: number
    tripId: number
    attractionId:number
    name?: string
    description?: string
    start_time?: string
    end_time?: string
    location?: string
    type: string
}

export interface IScheduleItemState{
    scheduleItems: IScheduleItem[]
}