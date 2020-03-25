import { IDate, IDaysInfor } from "./trip/state";
import React from 'react'


export interface ICalTripDurationProps {
    city: string
    startDate: IDate
    endDate: IDate

}

export function CalTripDuration(props: ICalTripDurationProps) {


    let numberOfDays = 0;
    let isOverAMonth = true
    let dateInfor: IDaysInfor[] =
        [{
            month: "",
            days: []
        }]

    let startMonthDays = []
    let endMonthDays = []

    const daysOfAMonth = new Date(parseInt(props.startDate.year), parseInt(props.startDate.month), 0).getDate()

    // calculate num of days of the trip
    if (parseInt(props.endDate.day) - parseInt(props.startDate.day) > 0) {
        isOverAMonth = false
        numberOfDays = parseInt(props.endDate.day) - parseInt(props.startDate.day) + 1
    } else {
        numberOfDays = daysOfAMonth - parseInt(props.startDate.day) + (parseInt(props.endDate.day)) + 1
    }

    for (let i = 0; i < numberOfDays; i++) {
        // within a month case
        if (!isOverAMonth || daysOfAMonth - (parseInt(props.startDate.day) + i) > -1) {
            startMonthDays.push(parseInt(props.startDate.day) + i)
        } else { 
            // over a month case
            endMonthDays.push(parseInt(props.startDate.day) + i - daysOfAMonth)
        }

    }

    console.log(props.startDate.month);
    console.log(startMonthDays);

    console.log(props.endDate.month);
    console.log(endMonthDays);
    
    dateInfor.push({
        month: props.startDate.month,
        days: startMonthDays
    })

    dateInfor.push({
        month: props.endDate.month,
        days: endMonthDays
    })


    // const tripDetailString = localStorage.getItem("tripDetail") || "{}"
    // let tripDetail = JSON.parse(tripDetailString);
    // tripDetail = {
    //     city: props.city,
    //     startDate: props.startDate,
    //     endDate: props.endDate
    // }
    // localStorage.setItem("tripDetail", JSON.stringify(tripDetail));



    return (
        <div></div>
    )

}