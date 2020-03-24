import React, { useState } from 'react';
import './DraggableEvent.scss';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Card, CardHeader, CardContent, makeStyles, Theme, createStyles } from '@material-ui/core';


let eventData = [
    { id: 1, title: 'Ocean Park' },
    { id: 2, title: 'Nan Lian Garden' },
    { id: 3, title: 'Hong Kong Museum of History' },
    { id: 4, title: 'Hong Kong Museum of Medical Sciences' },
    { id: 5, title: 'Latau Island' },
    { id: 6, title: 'Hong Kong Railway Museum' },
    { id: 7, title: 'Tian Tan Buddha (Big Buddha)' },
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 250,
            height: 500,
            marginTop: 80,
            marginRight: 50,
            marginLeft: 50
        }
    }),
);

export function DraggableEvent() {

    const classes = useStyles();
    const [events, setEvent] = useState(eventData);

    return (
        <Card className={classes.root}>
            <div id='external-events'>
                <CardHeader
                    title="Unplanned Event">
                </CardHeader>
                <CardContent>
                    {events.map((event: any) => (
                        <div
                            className="fc-event fc-resizable fc-item"
                            title={event.title}
                            // data={event.id}
                            key={event.id}

                        >
                            {event.title}
                        </div>
                    ))}
                </CardContent>
                <p>
                    <input type='checkbox' id='drop-remove' />
                    {/* <label for='drop-remove'>remove after drop</label> */}
                </p>
            </div>
        </Card>
    )


}