import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import { EventSnackbar } from './SnackBar';

import { MaterialUIPickers } from './MUIDatePicker'
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

import { LocationSelect } from './LocationSelect'
import { useForm } from 'react-hook-form';
import { MUITimePicker, TimeOptionType } from './MUITimePicker';
// import 'date-fns';

// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center'
        },
        eventName: {
            margin: "0 !important"
        },
        location: {
            margin: "0 !important"
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #FFFFFF',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 40,
            paddingRight: 40,
            outline: 0,
            display: 'flex',
            flexDirection: "column"
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center"
        },
        createButton: {
            fontWeight: 'bold',
            width: 150,
            height: 40,
            backgroundColor: "#444444",
            color: "#FFFFFF",
            borderRadius: 100,
            fontSize: 15,
            marginBottom: 20,
            textTransform: "none"
        },
        createButtonColumn: {
            display: 'flex',
            justifyContent: "center",
            paddingTop: 20
        },
        formTitle: {
            marginBottom: 40,
            textTransform: 'none',
            fontSize: 18,
            color: '#424242 !important',
            fontWeight: 800,
            paddingTop: 0
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        dateTime: {
            display: 'flex',
            marginTop: 32,
            marginBottom: 32
        },
        date: {

        },
        description: {
            marginTop: 40,
            marginBottom: 20
        },
        closePosition: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        closeButton: {
            padding: 0
        }
    }),
);

export interface IAddEventForm {
    isShowing: boolean
    hide: () => void
    eventInfo: any
}


export function AddEventForm(props: IAddEventForm) {

    const startTime = moment(props.eventInfo.date).format('LT');
    const endTime = moment(props.eventInfo.date).add(1, 'hour').format('LT');


        // console.log(startTimeString);
    // console.log(endTimeString);

    const classes = useStyles();


    const { handleSubmit, register, setValue, errors } = useForm();

    useEffect(() => {
        // register({ name: "eventName" }, { required: true });
        // register({ name: "date" }, { required: true });
        // register({ name: "startTime" }, { required: true });
        // register({ name: "endTime" }, { required: true });
        register({ name: "location" }, { required: true });
        // register({ name: "description" }, { required: true });

    }, [register])

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const handleEventNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue("eventName", event.target.value as string)
    };

    setValue("date",props.eventInfo.date)

    const handleDateChange = (date: Date | null) => {
        setValue("date", date)
    };

    setValue("startTime",startTime)

    const handleStartTimeChange = (event: any, newValue: TimeOptionType | null) => {
        setValue("startTime", newValue?.time)
        
    };

    setValue("endTime", endTime)

    const handleEndTimeChange = (event: any, newValue: TimeOptionType | null) => {
        setValue("endTime", newValue?.time)
    };

    const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue("description", event.target.value as string)
    };

    const handleLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue("location", event.target.value as string)
    };




    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.isShowing}
                onClose={props.hide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.isShowing}>
                    <div className={classes.paper}>
                        <div className={classes.root}>
                            <div className={classes.closePosition}>
                                <IconButton className={classes.closeButton}
                                    classes={{ label: 'Mui-disabled' }} size="medium" aria-label="close" color="inherit" onClick={props.hide}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </div>
                            <Button className={classes.formTitle} disabled>Add custom event</Button>
                            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    className={classes.eventName}
                                    id="outlined-full-width"
                                    label="Event Name"
                                    style={{ margin: 8 }}
                                    placeholder="Enter custom event name"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleEventNameChange}
                                />
                                <div className={classes.dateTime}>
                                    <FormControl className={classes.date}>
                                        <MaterialUIPickers
                                            date={props.eventInfo.date}
                                            handleDateChange={handleDateChange}
                                        />
                                    </FormControl>
                                    <MUITimePicker
                                        startTime={startTime}
                                        handleStartTimeChange={handleStartTimeChange}
                                        endTime={endTime}
                                        handleEndTimeChange={handleEndTimeChange}
                                    />
                                </div>
                                <LocationSelect
                                    handleLocationChange={handleLocationChange} />
                                <TextField
                                    className={classes.description}
                                    id="outlined-multiline-static"
                                    label="Enter Description"
                                    multiline
                                    rows="4"
                                    placeholder="Enter Description"
                                    variant="outlined"
                                    onChange={handleDescriptionChange}
                                    style={{ width: 514 }}
                                />


                                <div className={classes.createButtonColumn}>
                                    <Button className={classes.createButton} variant="contained" type="submit" size="small">Save</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>
    );
}