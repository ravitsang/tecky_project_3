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
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
                display: 'flex',
                flexDirection: 'column',
                height:360,
                width:300
            }
        },
        actionArea: {
            // height: 144,
            // width: 216
        },

        media: {

            [theme.breakpoints.up('sm')]: {
                height: 144,
                width: 216,
                display: 'flex'
            },
            [theme.breakpoints.down('sm')]: {
                height: 0,
                paddingTop: '67.25%', // 16:9
                // display: 'flex',
                // padding: 0
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
    const startDate = tripSchedule.dateInfor[0].startDate



    tripEvents.map((event) => {
        console.log(new Date(event.startTime));
    })

    const sortedTripEvents = tripEvents.sort(function (a, b) {
        return (new Date(a.startTime) as any) - (new Date(b.startTime) as any);
    });

    console.log(sortedTripEvents);

    const renderScheduleDate = (sortedTripEvent: ITripEvents, index: number) => {


        const prevIndex = index === 0 ? index : index - 1
        console.log(prevIndex);
        if (moment(sortedTripEvent.startTime).format('l') !== moment(sortedTripEvents[prevIndex].startTime).format('l') || index === 0) {
            const day = moment(sortedTripEvent.startTime).format('l').split('/')[1];
            return (
                <div id={day}>
                    <Button className={classes.dateButton} size="medium">
                        {`${moment(sortedTripEvent.startTime).format('ddd')},${moment(sortedTripEvent.startTime).format('MMM Do')}`}
                    </Button>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    const renderCityName = () => {

        return (
            <>
                <div className="vertical"></div>
                <div className="city-name">{tripSchedule.city}</div>
            </>
        )
    }

    const renderScheduleItem = (sortedTripEvent: ITripEvents, index: number) => {

        // {sortedTripEvents.map((sortedTripEvent, index) => {
        //     console.log(sortedTripEvent.title);
        return (
            <div className="scheduleItem">
                {renderScheduleDate(sortedTripEvent, index)}
                {index === 0 ? renderCityName() : <div></div>}
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
                    <div className="drive-time"> {Math.floor(Math.random() * 60)} mins</div>
                </div>
                <div className="vertical"></div>
                <Card className={`${classes.root} itinerary-card`}>
                    <Responsive maxWidth={960}>
                        <div className="sm-time-edit-column">
                            <CardContent className="time-display">
                                <div>
                                    {`${moment(sortedTripEvent.startTime).format('LT')} - ${moment(sortedTripEvent.endTime).format('LT')}`}
                                </div>
                            </CardContent>
                            <CardContent>
                                <EditIcon fontSize='small'/>
                            </CardContent>
                        </div>
                        <div className="sm-media-header-row">
                            <CardActionArea className={classes.actionArea}>
                                <CardMedia
                                    className={classes.media}
                                    image={sortedTripEvent.attraction_image}
                                    title={sortedTripEvent.title}
                                />
                            </CardActionArea>
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
        // })}
    }


    const renderEmptyScheduleItem = () => {

        return (
            <div>
                <Button className={classes.dateButton} size="medium">
                    {`${moment(new Date(startDate as any)).format('ddd')},${moment(new Date(startDate as any)).format('MMM Do')}`}
                </Button>
                <div className="vertical left-margin"></div>
                <div className="add-hotel-column">
                    <Fab className={classes.hotelIcon} aria-label="edit">
                        <FlightTakeoffIcon />
                    </Fab>
                    <div className="add-hotel-link">Plan your trip in <Link to="/calendar">calendar</Link> for displaying your itinerary</div>
                </div>
            </div>
        )
    }

    const printDocument = () => {
        const input = document.getElementById('itienrary');
        if (input !== null) {
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'JPEG', 0, 0);
                    // pdf.output('dataurlnewwindow');
                    pdf.save("download.pdf");
                })
                ;
        }
    }


    return (
        <div>
            {/* <div className='tab-column'>
                <TabBar />
            </div> */}

                <Responsive minWidth={600}>
                    <div className="days-bar">
                        <button onClick={printDocument} style={{ padding: 10, borderRadius: 5, borderColor: '#6A6A6A', backgroundColor: '#6A6A6A', color: '#fff' }}>Export PDF</button>
                        <DaysBar />
                    </div>
                </Responsive>
            <div className="main" id="itienrary">
                <div className="itinerary">
                    {sortedTripEvents.map((sortedTripEvent, index) => {
                        return renderScheduleItem(sortedTripEvent, index)
                    })}
                    {(sortedTripEvents.length === 0) && renderEmptyScheduleItem()}
                </div>
            </div>
        </div>
    );
}