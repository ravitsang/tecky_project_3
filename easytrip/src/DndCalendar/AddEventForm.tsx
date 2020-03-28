import React from 'react';
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
            textTransform: "none",
            width: 277,
            height: 50,
            fontSize: 14
        },
        createButtonColumn: {
            display: 'flex',
            justifyContent: "center",
            paddingTop: 20
        },
        formTitle: {
            marginBottom: 40,
            textTransform: 'none'
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
            marginTop: 32
        },
        date: {

        },
        description: {
            marginTop: 40,
            marginBottom: 40
        },
        closePosition: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        closeButton:{
            padding:0
        }
    }),
);

export interface IAddEventForm {
    isShowing: boolean
    hide: () => void
    eventInfo: any
}


export function AddEventForm(props: IAddEventForm) {
    const classes = useStyles();

    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };


    console.log(props.eventInfo);

    let startTimeString = moment(props.eventInfo.date).format('LT');
    const startTime = startTimeString.split(' ')[0] + startTimeString.split(' ')[1].toLowerCase()

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
                            <Button className={classes.formTitle} disabled>Create custom event</Button>
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
                            />
                            <div className={classes.dateTime}>
                                <FormControl className={classes.date}>
                                    <MaterialUIPickers date={props.eventInfo.date} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Start Time
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value="">
                                            <em>{startTime}</em>
                                        </MenuItem>
                                        <MenuItem value={"00:00"}>12:00am</MenuItem>
                                        <MenuItem value={"00:30"}>12:30am</MenuItem>
                                        {
                                            Array(11).fill(null).map((num, index) => {
                                                return (
                                                    <>
                                                        <MenuItem value={`${1 + index}:00`}>{1 + index}:00am</MenuItem>
                                                        <MenuItem value={`${1 + index}:30`}>{1 + index}:30am</MenuItem>
                                                    </>
                                                )
                                            })
                                        }
                                        <MenuItem value={"12:00"}>12:00pm</MenuItem>
                                        <MenuItem value={"12:30"}>12:30pm</MenuItem>
                                        {Array(11).fill(null).map((num, index) => {
                                            return (
                                                <>
                                                    <MenuItem value={`${1 + index}:00`}>{1 + index}:00pm</MenuItem>
                                                    <MenuItem value={`${1 + index}:30`}>{1 + index}:30pm</MenuItem>
                                                </>
                                            )
                                        }
                                        )}

                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        End time
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"00:00"}>12:00am</MenuItem>
                                        <MenuItem value={"00:30"}>12:30am</MenuItem>
                                        {
                                            Array(11).fill(null).map((num, index) => {
                                                return (
                                                    <>
                                                        <MenuItem value={`${1 + index}:00`}>{1 + index}:00am</MenuItem>
                                                        <MenuItem value={`${1 + index}:30`}>{1 + index}:30am</MenuItem>
                                                    </>
                                                )
                                            })
                                        }
                                        <MenuItem value={"12:00"}>12:00pm</MenuItem>
                                        <MenuItem value={"12:30"}>12:30pm</MenuItem>
                                        {Array(11).fill(null).map((num, index) => {
                                            return (
                                                <>
                                                    <MenuItem value={`${1 + index}:00`}>{1 + index}:00pm</MenuItem>
                                                    <MenuItem value={`${1 + index}:30`}>{1 + index}:30pm</MenuItem>
                                                </>
                                            )
                                        }
                                        )}

                                    </Select>
                                </FormControl>
                            </div>
                            <TextField
                                className={classes.description}
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows="4"
                                placeholder="Enter Description"
                                variant="outlined"
                            />
                            <LocationSelect />
                            <div className={classes.createButtonColumn}>
                                <Button className={classes.createButton}>Save</Button>
                            </div>

                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>
    );
}