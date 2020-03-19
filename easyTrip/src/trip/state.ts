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

export interface ITripState {

    tripDetail:ITrip
}