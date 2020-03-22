import React, { useState } from 'react';
import './DraggableEvent.scss';

let eventData = [
    { title: "Event 1", id: "1" },
    { title: "Event 2", id: "2" },
    { title: "Event 3", id: "3" },
    { title: "Event 4", id: "4" },
    { title: "Event 5", id: "5" }
]

export function DraggableEvent() {

    const [events, setEvent] = useState(eventData);

    return (
        <div id='external-events'>
            <p>
                <strong>Draggable Events</strong>
            </p>
            {events.map((event: any) => (
                <div
                    className="fc-event"
                    title={event.title}
                    // data={event.id}
                    key={event.id}
                >
                    {event.title}
                </div>
            ))}
            <p>
                <input type='checkbox' id='drop-remove' />
                {/* <label for='drop-remove'>remove after drop</label> */}
            </p>
        </div>
    )


}