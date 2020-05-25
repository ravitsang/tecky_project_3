import React, { useState, useEffect } from 'react';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Card, CardHeader, CardContent, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import './ExternalEvent.scss'


// let eventData = [
//     { id: 1, title: 'Ocean Park' },
//     { id: 2, title: 'Nan Lian Garden' },
//     { id: 3, title: 'Hong Kong Museum of History' },
//     { id: 4, title: 'Hong Kong Museum of Medical Sciences' },
//     { id: 5, title: 'Latau Island' },
//     { id: 6, title: 'Hong Kong Railway Museum' },
//     { id: 7, title: 'Tian Tan Buddha (Big Buddha)' },
// ]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('sm')]: {
                minWidth: 228,
                height: 500,
                marginTop: 80,
                textAlign: 'center',
                position: 'relative'
            },
            [theme.breakpoints.down('sm')]: {

                minWidth: 228,
                maxWidth: 375,
                height: 186,
                textAlign: 'center',
                position: 'relative',
                borderRadius: 0
            }
        },
        header: {
            [theme.breakpoints.up('sm')]: {
                backgroundColor: "#424242",
                color: '#fafafa',
                textAlign: "center"
            },
            [theme.breakpoints.down('sm')]: {
                backgroundColor: "#ffffff",
                color: '#424242',
                textAlign: "center",
                height: 20,
                padding: 19
            }


        },
        title: {
            [theme.breakpoints.up('sm')]: {
                fontSize: 20,
                paddingLeft: 0,
                paddingRight: 0
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 14,
                paddingLeft: 0,
                paddingRight: 0,
                fontWeight: 600
            },
            [theme.breakpoints.down('xl')]: {
                fontSize: 15,
                paddingLeft: 0,
                paddingRight: 0
            },
            
        },
        cards: {
            padding:0
        }
    }),
);

// interface IExternalEventProps{
//     dropItem:string
// }




export function ExternalEvent() {

    const classes = useStyles();

    // const externalEvents = useSelector((state: IRootState) => state.trip.externalEvents)
    const scheduleItem = useSelector((state: IRootState) => state.trip.scheduleItems)

    console.log(scheduleItem);

    useEffect(() => {
        console.log('component did updated');

    },[])


    return (
        
        <Card className={`${classes.root} external-event`}>
            {console.log('component did updated')}
            <div id='external-events'>
                <CardHeader
                    className={`${classes.header} external-event-header`}
                    classes={{
                        title: classes.title,
                    }}
                    title="Unplanned Event">
                </CardHeader>
                <CardContent className={classes.cards}>
                    {scheduleItem.map((event: any) => (
                        <div
                            className="fc-event fc-resizable fc-item"
                            title={event.name}
                            id={event.attractionId} // pass the attraction id into draggedEl 
                        // data={parseInt(event.attractionId)}
                        // key={event.id}

                        >
                            {event.name}
                        </div>
                    ))}
                </CardContent>
            </div>
        </Card>
    )


}