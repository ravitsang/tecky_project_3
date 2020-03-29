export interface ITrip {

    city: string
    startDate: IDate
    endDate: IDate
}

export interface IDate {
    days: string,
    month: string,
    day: string,
    year: string,
    textMonth: string
}


export interface IDaysInfor {

    startDate?:string
    endDate?:string
    year: number
    month: string[],
    days: number[]

}



export interface IConstraint{
    start?: Date
    end?: Date
}

export interface ICalendarEvents {

    id: number
    title: string
    start: Date
    end: Date
    overlap?: boolean
    backgroundColor?: string
    durationEditable?: boolean
    constraint?:IConstraint
}

export interface ITripEvents {
    id: number
    title: string
    location?: string
    description?: string
    startTime?: Date
    endTime?: Date
    date?: string
    image?: string

}

export interface ITripSchedule {

    city: string
    dateInfor: IDaysInfor[]
    tripDays: number
}

export interface ITripState {

    tripSchedule: ITripSchedule
    calendarEvents: ICalendarEvents[]
    tripEvents: ITripEvents[]
    externalEvents: ITripEvents[]
    eventTimeConstraint: Date []
}