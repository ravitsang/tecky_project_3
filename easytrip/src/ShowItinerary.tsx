import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { CardActionArea, CardContent, CardMedia, Typography, CardHeader, IconButton, Fab, Button, Card } from '@material-ui/core';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EditIcon from '@material-ui/icons/Edit';
import HotelIcon from '@material-ui/icons/Hotel';

import { useSelector } from 'react-redux';
import { IRootState } from './store';
import { DaysBar } from './DaysBar';
import { Link } from 'react-router-dom';
import Responsive from "react-responsive";
import { TabBar } from './TabBar';
import './ShowItinerary.scss'
import './stylePage.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('sm')]: {
                height: 200,
                width: 750,
                display: 'flex',
            },
            [theme.breakpoints.down('sm')]: {
                height: 300,
                width: 350,
                display: 'flex',
                flexDirection: 'column'
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
        }
    }))


export function ShowItinerary() {
    const classes = useStyles();
    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)
    const tripEvents = useSelector((state: IRootState) => state.trip.tripEvents)

    console.log(tripEvents);
    const startDateInfor = tripSchedule.dateInfor[0]



    return (
        <div>
            <div className='tab-column'>
                <TabBar />
            </div>
            <div className="main">
                <Responsive minWidth={600}>
                    <DaysBar />
                </Responsive>
                <div className="itinerary">
                    <Button className={classes.dateButton} size="medium">
                        {`${startDateInfor.month[0]}, ${startDateInfor.days[0]}`}
                    </Button>
                    <div className="vertical"></div>
                    <div className="add-hotel-column">
                        <Fab className={classes.hotelIcon} aria-label="edit">
                            <HotelIcon />
                        </Fab>
                        <div className="add-hotel-link"><Link to="/">Add reservation</Link> for better travel calculation</div>
                    </div>
                    <div className="vertical"></div>
                    <div className="drive-time-column">
                        <DirectionsCarIcon />
                        <div className="drive-time"> 26 min</div>
                    </div>
                    <div className="vertical"></div>
                    <Card className={`${classes.root} itinerary-card`}>
                        <Responsive maxWidth={960}>
                            <div className="sm-time-edit-column">
                                <CardContent className="time-display">
                                    10:00am
                                    12:30pm
                                </CardContent>
                                <CardContent>
                                    <EditIcon />
                                </CardContent>
                            </div>
                            <div className="sm-media-header-row">
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
                                    <CardHeader className={classes.header}
                                        classes={{
                                            title: classes.title,
                                        }}
                                        title="Sik Sik Yuen Wong Tai Sin Temple"
                                        subheader="September 14, 2016"
                                    />
                                </CardContent>
                            </div>
                        </Responsive>
                        <Responsive minWidth={960}>
                            <CardContent className="time-display">
                                10:00am
                                12:30pm
                            </CardContent>
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
                                <CardHeader className={classes.header}
                                    classes={{
                                        title: classes.title,
                                    }}
                                    action={
                                        <IconButton aria-label="settings">
                                            <EditIcon />
                                        </IconButton>
                                    }
                                    title="Sik Sik Yuen Wong Tai Sin Temple"
                                    subheader="September 14, 2016"
                                />
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Popular for its claim to make wishes come true, Sik Sik Yuen Wong Tai Sin Temple hosts three religions including Taoism, Buddhism, and Confuc
                                </Typography>
                            </CardContent>
                        </Responsive>
                    </Card>
                </div>
            </div>
        </div>
    );
}