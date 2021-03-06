import React, { useEffect } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { CardActionArea, CardContent, CardMedia, Typography, CardHeader, IconButton, Fab, Button, Card, Grid } from '@material-ui/core';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
// import EditIcon from '@material-ui/icons/Edit';
import HotelIcon from '@material-ui/icons/Hotel';

import { useSelector, useDispatch } from 'react-redux';
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
import { getDrivingThunk } from './trip/thunks';
import { resetDriving } from './trip/actions';

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
                height: 360,
                width: 300
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
            marginBottom: 10,

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
    const drivingDuration = useSelector((state: IRootState) => state.trip.drivingDuration)
    // const externalEvents = useSelector((state: IRootState) => state.trip.externalEvents)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetDriving());
        calDrivingDuration();
        return () => {

        }
    }, [])



    console.log(tripEvents);
    // console.log(externalEvents);
    const startDate = tripSchedule.dateInfor[0]?.startDate


    tripEvents.map((event) => {
        console.log(new Date(event.startTime));
    })

    const sortedTripEvents = tripEvents.sort(function (a, b) {
        return (new Date(a.startTime) as any) - (new Date(b.startTime) as any);
    });

    console.log(sortedTripEvents);

    
    console.log(drivingDuration);

    // calculate the driving time between two aattractions
    const calDrivingDuration = () => {
        sortedTripEvents.map((event, num) => {
            event.location && sortedTripEvents.length - 1 !== num ? dispatch(getDrivingThunk(event.location, sortedTripEvents[num + 1].location! )) : Math.floor(Math.random() * 60)
            console.log(drivingDuration);
        })
    }

    // the date header in the itinerary
    const renderScheduleDetail = (sortedTripEvent: ITripEvents, index: number) => {

        const prevIndex = index === 0 ? index : index - 1
        console.log(prevIndex);
        if (moment(sortedTripEvent.startTime).format('l') !== moment(sortedTripEvents[prevIndex].startTime).format('l') || index === 0) {
            const day = moment(sortedTripEvent.startTime).format('l').split('/')[1];
            return (
                <>
                    <div id={day}>
                        <Button className={classes.dateButton} size="medium">
                            {`${moment(sortedTripEvent.startTime).format('ddd')},${moment(sortedTripEvent.startTime).format('MMM Do')}`}
                        </Button>
                    </div>
                    {index === 0 ? renderCityName() : <div></div>}
                    <div className="vertical"></div>
                    <div className="add-hotel-column">
                        <Fab className={classes.hotelIcon} aria-label="edit">
                            <HotelIcon />
                        </Fab>
                        <div className="add-hotel-link"><Link to="/">Add reservation</Link> for better travel calculation</div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="vertical"></div>
                    <div className="drive-time-column">
                        <DirectionsCarIcon />
                        <div className="drive-time">
                            {drivingDuration[index - 1]}
                            {/* {drivingDuration} */}
                        </div>
                    </div>
                </>
                )
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


        return (
            <div>


                <div className="scheduleItem">
                    {renderScheduleDetail(sortedTripEvent, index)}

                    {/* <div className="vertical"></div>
                    <div className="add-hotel-column">
                        <Fab className={classes.hotelIcon} aria-label="edit">
                            <HotelIcon />
                        </Fab>
                        <div className="add-hotel-link"><Link to="/">Add reservation</Link> for better travel calculation</div>
                    </div> */}
                    {/* <div className="vertical"></div>
                    <div className="drive-time-column">
                        <DirectionsCarIcon />
                        <div className="drive-time">
                            {index !== 0 ? drivingDuration[index - 1] : ""}
                            {console.log(index)}
                        </div>
                    </div> */}
                    <div className="vertical"></div>
                    <Card className={`${classes.root} itinerary-card`}>
                        <Responsive maxWidth={960}>
                            <div className="sm-time-edit-column">
                                <CardContent className="time-display">
                                    <div>
                                        {`${moment(sortedTripEvent.startTime).format('LT')} - ${moment(sortedTripEvent.endTime).format('LT')}`}
                                    </div>
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
                    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                    // pdf.output('dataurlnewwindow');
                    pdf.save("EasyTrip_Itinerary.pdf");
                })
                ;
        }
    }


    return (
        <div>
            <TabBar tabState={2} />
            <div className="itinerary-page">
                <Responsive minWidth={600}>
                    <div className="days-bar-row">
                        <div className="export-button-row">
                            <button onClick={printDocument} style={{ padding: 10, borderRadius: 5, borderColor: '#6A6A6A', backgroundColor: '#6A6A6A', color: '#fff' }}>Export PDF</button>
                        </div>
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
        </div>
    );
}