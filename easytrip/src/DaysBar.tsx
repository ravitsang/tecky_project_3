import { useSelector } from "react-redux";
import { IRootState } from "./store";
import React from 'react'
// import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './DaysBar.scss'

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

    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)

    const startDateInfor = tripSchedule.dateInfor[0]
    const endDateInfor = tripSchedule.dateInfor[1]
    console.log(startDateInfor);
    console.log(endDateInfor);




    return (
        <div className="days-bar-row">
            <div className={classes.buttonGroup}>
                <Button className={classes.monthButton} href="#">{startDateInfor.month[0].toUpperCase()}</Button>
                {
                    startDateInfor.days.map((num) => {
                        console.log(num);
                        console.log(startDateInfor.month[1]);
                        return <Button className={classes.dayButton} href={`#${num}`}>{num}</Button>
                    })
                }
                {startDateInfor.month[0] !== endDateInfor.month[0] && <Button className={classes.monthButton} href="#">{endDateInfor.month[0].toUpperCase()}</Button>}
                {
                    endDateInfor.days.map((num) => {
                        console.log(num);
                        console.log(console.log(endDateInfor.month[1]));
                        return <Button className={classes.dayButton} href={`#${num}`}>{num}</Button>
                    })
                }
            </div>
        </div>
    )

}
