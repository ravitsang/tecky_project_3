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

    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)

    const startDateInfor = tripSchedule.dateInfor[0]
    const endDateInfor = tripSchedule.dateInfor[1]
    console.log(startDateInfor);
    console.log(endDateInfor);




    return (
        <div>
            <div className={classes.buttonGroup}>
                <Button className={classes.monthButton} href="#">{startDateInfor.month[0]}</Button>
                {
                    startDateInfor.days.map((num) => {
                        return <Button className={classes.dayButton} href="#">{num}</Button>
                    })
                }
                <Button className={classes.monthButton} href="#">{endDateInfor.month[0]}</Button>
                {
                    endDateInfor.days.map((num) => {
                        return <Button className={classes.dayButton} href="#">{num}</Button>
                    })
                }
            </div>
        </div>
    )

}
