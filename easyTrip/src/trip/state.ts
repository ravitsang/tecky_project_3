export interface ITrip{

    city:string
    startDate: IDate
    endDate: IDate
}

export interface IDate{
    days:string,
    month:string,
    day:string,
    year:string,
    textMonth:string
}


export interface IDaysInfor{

    month:string[],
    days: number[]

}

export interface ITripSchedule{
    
    city: string
    dateInfor: IDaysInfor[]
}


export interface ICalendarEvents {
    
    id: number
    title: string
    start: Date
    end: Date
}

export interface ITripEvents{
    id:number
    title: string
}

export interface ITripState {

    tripSchedule: ITripSchedule
    calendarEvents: ICalendarEvents[]
    tripEvents:ITripEvents[]
    externalEvents:ITripEvents[]
}