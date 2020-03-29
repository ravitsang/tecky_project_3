import React, { useState } from 'react';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Card, CardHeader, CardContent, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';


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
            maxWidth: 250,
            minWidth:250,
            height: 500,
            marginTop: 80,
            marginRight: 50,
            marginLeft: 50,
            textAlign: 'center'
        },
        header: {
            backgroundColor: "#424242",
            color: '#fafafa',
            textAlign: "center",
            height: 60
            
        },
        title: {
            fontSize: 20
        }
    }),
);

// interface IExternalEventProps{
//     dropItem:string
// }




export function ExternalEvent() {

    const classes = useStyles();

    const externalEvents = useSelector((state: IRootState) => state.trip.externalEvents)


    return (
        <Card className={classes.root}>
            <div id='external-events'>
                <CardHeader
                    className={classes.header}
                    classes={{
                        title: classes.title,
                    }}
                    title="Unplanned Event">
                </CardHeader>
                <CardContent>
                    {externalEvents.map((event: any) => (
                        <div
                            className="fc-event fc-resizable fc-item"
                            title={event.name}
                            // data={event.id}
                            key={event.id}

                        >
                            {event.name}
                        </div>
                    ))}
                </CardContent>
            </div>
        </Card>
    )


}