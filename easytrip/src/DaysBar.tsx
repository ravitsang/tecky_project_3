import { useSelector } from "react-redux";
import { IRootState } from "./store";
import React from 'react'
// import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonGroup: {
        display: "flex",
        flexDirection: "column"
    },
    dayButton:{
        fontSize:17
    },
    monthButton:{
        fontSize:17,
        fontWeight: "bold",
        textTransform: "none"
    }
});


export function DaysBar() {
    const classes = useStyles();

    const date = useSelector((state: IRootState) => state.trip.tripDetail)
    const startDate = date.startDate
    const endDate = date.endDate
    let numberOfDays = 0;
    let isOverAMonth = true
    console.log(startDate.month)
    const daysOfAMonth = new Date(parseInt(startDate.year), parseInt(startDate.month), 0).getDate()

    // function daysInMonth(month, year) {
    //     return new Date(year, month, 0).getDate();
    // }

    if (parseInt(endDate.day) - parseInt(startDate.day) > 0) {
        isOverAMonth = false
        numberOfDays = parseInt(endDate.day) - parseInt(startDate.day) + 1
        // console.log(numberOfDays);

    } else {
        numberOfDays = daysOfAMonth - parseInt(startDate.day) + (parseInt(endDate.day)) + 1
        // console.log(numberOfDays);
    }


    console.log(numberOfDays);
    const renderDayButton = (index: number) => {
        if (!isOverAMonth || daysOfAMonth - (parseInt(startDate.day) + index) > -1) {
            console.log(index);
            console.log(isOverAMonth);
            console.log({daysOfAMonth:daysOfAMonth});
            console.log({startDate:parseInt(startDate.day)});
            console.log(daysOfAMonth - parseInt(startDate.day) + index);
            return <Button className={classes.dayButton} href="#">{parseInt(startDate.day) + index}</Button>
        } else {
            console.log(index);
            console.log({isOverAMonth:isOverAMonth});
            return (
                <Button className={classes.dayButton} href="#">{parseInt(startDate.day) + index - daysOfAMonth}</Button>
            )
        }

    }



    return (
        <div>
            <div className={classes.buttonGroup}>
                <Button className={classes.monthButton} href="#">{startDate.textMonth}</Button>
                {
                    Array(numberOfDays).fill(null).map((num, index) => {
                        return renderDayButton(index)
                    })
                }
                {/* <Button href="#">{startDate.day}</Button>
                    {startDate.month !== endDate.month ? <Button href="#">{endDate.month}</Button> : ""}
                    <Button href="#">{endDate.day}</Button> */}
            </div>
        </div>
    )

}
