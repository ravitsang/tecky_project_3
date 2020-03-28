import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        date: {
            marginTop: 8
        }
    })
)


export interface IMaterialUIPickers {
    date: string
    handleDateChange: (date: Date | null) => void
}

export function MaterialUIPickers(props: IMaterialUIPickers) {
    const classes = useStyles();
    // The first commit of Material-UI
    // const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    //     props.defaultDate,
    // );
    // const handleDateChange = (date: Date | null) => {
    //     props.handleDateChange(date);
    // };



    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    className={classes.date}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={props.date}
                    onChange={(date)=> props.handleDateChange(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
