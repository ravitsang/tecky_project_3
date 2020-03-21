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

    month:string,
    days: number[]

}
export interface ITripState {

    tripDetail:ITrip
    dateInfor: IDaysInfor[]
}