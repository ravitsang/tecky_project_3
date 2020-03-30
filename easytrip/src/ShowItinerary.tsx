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
import moment from 'moment';
import { ITripEvents } from './trip/state';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('sm')]: {
                height: 200,
                width: 700,
                display: 'flex',
                paddingTop: 15
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
        subheader: {
            fontSize: 14
        },
        hotelIcon: {
            backgroundColor: '#FFFFFF'
        },
        dateButton: {
            fontWeight: 'bold',
            width: 150,
            height: 47,
            backgroundColor: "#444444",
            color: "#FFFFFF",
            borderRadius: 100,
            fontSize: 18,
            textTransform: "none",
            marginTop: 50
        },
        textArea: {
            width: 360
        }
    }))


export function ShowItinerary() {
    const classes = useStyles();
    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)
    const tripEvents = useSelector((state: IRootState) => state.trip.tripEvents)
    const calendarEvents = useSelector((state: IRootState) => state.trip.calendarEvents)
    // console.log(calendarEvents);
    console.log(tripEvents);
    const startDateInfor = tripSchedule.dateInfor[0]



    tripEvents.map((event) => {
        console.log(new Date(event.startTime));
    })

    const sortedTripEvents = tripEvents.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (new Date(a.startTime) as any) - (new Date(b.startTime) as any);
    });

    console.log(sortedTripEvents);

    const renderScheduleDate = (sortedTripEvent:ITripEvents, index:number) => {


        const prevIndex = index === 0 ? index : index - 1
        console.log(prevIndex);
        // console.log(sortedTripEvents[prevIndex].startTime);
        if (moment(sortedTripEvent.startTime).format('l') !== moment(sortedTripEvents[prevIndex].startTime).format('l') || index === 0){
            return (
                <>
                    <Button className={classes.dateButton} size="medium">
                        {`${moment(sortedTripEvent.startTime).format('ddd')},${moment(sortedTripEvent.startTime).format('MMM Do')}`}
                    </Button>
                </>
            )
        } else {
            return <div></div>
        }
    }


    return (
        <div>
            <div className='tab-column'>
                <TabBar />
            </div>
            <div className="main">
                <Responsive minWidth={600}>
                    <div className="days-bar">
                        <DaysBar />
                    </div>
                </Responsive>
                <div className="itinerary">

                    {sortedTripEvents.map((sortedTripEvent, index)=> {
                        console.log(sortedTripEvent.title);
                        return (
                            <div className="scheduleItem">
                                {renderScheduleDate(sortedTripEvent, index)}
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
                                    <div className="drive-time"> {Math.floor(Math.random()* 60)} mins</div>
                                </div>
                                <div className="vertical"></div>
                                <Card className={`${classes.root} itinerary-card`}>
                                    <Responsive maxWidth={960}>
                                        <div className="sm-time-edit-column">
                                            <CardContent className="time-display">
                                                <div>
                                                    {moment(sortedTripEvent.startTime).format('LT')}
                                                </div>
                                                <div>
                                                    {moment(sortedTripEvent.endTime).format('LT')}
                                                </div>
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
                                                        image={sortedTripEvent.attraction_image}
                                                        title={sortedTripEvent.title}
                                                    />
                                                </CardActionArea>
                                            </CardContent>
                                            <CardContent>
                                                <CardHeader className={classes.header}
                                                    classes={{
                                                        title: classes.title,
                                                    }}
                                                    title={sortedTripEvent.title}
                                                    subheader={`Location: ${sortedTripEvent.location}`}
                                                />
                                            </CardContent>
                                        </div>
                                    </Responsive>
                                    <Responsive minWidth={960}>
                                        <CardContent className="time-display">
                                            <div>
                                                {moment(sortedTripEvent.startTime).format('LT')}
                                            </div>
                                            <div>
                                                {moment(sortedTripEvent.endTime).format('LT')}
                                            </div>
                                        </CardContent>
                                        <CardContent>
                                            <CardActionArea className={classes.actionArea}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={sortedTripEvent.attraction_image}
                                                    title={sortedTripEvent.title}
                                                />
                                            </CardActionArea>
                                        </CardContent>
                                        <CardContent className={classes.textArea} >
                                            <CardHeader className={classes.header}
                                                classes={{
                                                    title: classes.title,
                                                    subheader: classes.subheader,
                                                }}
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <EditIcon />
                                                    </IconButton>
                                                }
                                                title={sortedTripEvent.title}
                                                subheader={sortedTripEvent.location}
                                            />
                                            <Typography variant="body2" color="textSecondary" component="p" className="descriptionArea">
                                                {sortedTripEvent.description}
                                            </Typography>
                                        </CardContent>
                                    </Responsive>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}