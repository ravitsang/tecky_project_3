import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardActionArea, CardMedia, CardHeader, IconButton, Typography, Button, TextField } from '@material-ui/core';
import Responsive from "react-responsive";
import { DateRangePicker } from 'react-dates';
import { Row, Col } from 'reactstrap';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #FFFFFF',
            boxShadow: theme.shadows[5],
            paddingTop: 40,
            paddingBottom: 20,
            paddingLeft: 40,
            paddingRight: 40,
            outline: 0,
            width:700

        },
        root: {
            [theme.breakpoints.up('sm')]: {
                height: 200,
                display: 'flex',
                marginLeft: 15
            },
            [theme.breakpoints.down('sm')]: {
                height: 300,
                width: 350,
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 15
            }
        },
        actionArea: {
            height: 144,
            width: 216
        },

        media: {

            [theme.breakpoints.up('sm')]: {
                height: 144,
                width: 216,
                display: 'flex'
            },
            [theme.breakpoints.down('sm')]: {
                height: 144,
                width: 216,
                display: 'flex',
                padding: 0
            }

        },
        header: {
            padding: 0,
            marginBottom: 30,

        },
        title: {
            fontSize: 17
        },
        hotelIcon: {
            backgroundColor: '#FFFFFF'
        },
        dateButton: {
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
        submit: {
            fontWeight: 'bold',
            width: 100,
            // height: 40,
            backgroundColor: "#444444",
            color: "#FFFFFF",
            borderRadius: 100,
            fontSize: 15,
            marginBottom: 20,
            marginTop:40,
            textTransform: "none"
        },
        remarksInput: {


        },
        input: {
            height: 150,
            width: 586
        },
        remove: {
            fontSize:15,
            textTransform: "none",
            fontStyle: "italic",
            color: "#B1B1B1"
            
        },
        editField:{
            display: 'flex',
            flexDirection:"column",
            alignItems: 'center',
            paddingBottom:  0
        },
        eventTime: {
            display: 'flex',
            justifyContent:'flex-end',
            paddingTop: 0,
            color: "#212529"
        },
        lowerArea: {
            paddingTop: 0
        },
        description:{
            width:320
        }
    }),
);

export function EventModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);


    const { handleSubmit, register, setValue, errors } = useForm();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const onSubmit = (values: any) => {
        console.log(values);
        // calTripDuration(values)

    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                react-transition-group
      </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>

                        <div className={classes.root}>
                            <CardContent>
                                <CardActionArea className={classes.actionArea}>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://img.icons8.com/clouds/200/000000/retro-tv.png"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </CardContent>
                            <CardContent>
                                <CardHeader
                                    className={classes.header}
                                    classes={{
                                        title: classes.title,
                                    }}
                                    title="Sik Sik Yuen Wong Tai Sin Temple"
                                    subheader="September 14, 2016"
                                />
                                <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                                    Popular for its claim to make wishes come true, Sik Sik Yuen Wong Tai Sin Temple hosts three religions including Taoism, Buddhism, and Confuc
                                </Typography>
                            </CardContent>
                        </div>
                        <CardContent  className={classes.lowerArea}>
                            <div className={classes.eventTime}>
                                <CardContent >
                                    10:00am
                                    12:30pm
                                </CardContent>
                            </div>
                            <form className={classes.editField} onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    className={classes.remarksInput}
                                    id="outlined-basic"
                                    label="Add Notes"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                    }} />
                                <Button className={classes.submit} variant="contained" size="medium" type="submit">Save</Button>
                                <Button className={classes.remove} size="medium" type="submit">Remove Event</Button>

                            </form>
                        </CardContent>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
