import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventInput, Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import moment from 'moment'
import './DndCalendar.scss'
import { DraggableEvent } from './DraggableEvent'

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


interface ICalendarEvents {

    id: number
    title: string
    start: Date
    end: Date
}


interface ICalendarData {

    calendarWeekends: boolean
    calendarEvents: ICalendarEvents[]
}


let calendarData: ICalendarData = {

    calendarWeekends: true,
    calendarEvents: [ // initial event data
        {
            id: 1,
            title: 'Event Now',
            start: new Date(),
            end: moment(new Date()).add(2, 'hours').toDate()
        }
    ]

}


export function DemoApp() {

    const calendarComponentRef = React.createRef<FullCalendar>()


    const [calendar, setCalendar] = useState(calendarData);



    useEffect(() => {
        let draggableEl: HTMLElement | null = document.getElementById("external-events");
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("data");
                    return {
                        title: title,
                        id: id
                    };
                }
            });
        }
    }, [])


    const toggleWeekends = () => {

        setCalendar({
            ...calendar,
            calendarWeekends: !calendar.calendarWeekends
        })
    }

    const gotoPast = () => {
        let calendarApi = calendarComponentRef.current!.getApi()
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    }

    const handleDateClick = (info: any) => {
        if (window.confirm('Would you like to add an event to ' + info.dateStr + ' ?')) {
            console.log(info);

            const ids = calendar.calendarEvents.map(event => event.id)
            const id = Math.max(...ids) + 1
            console.log(ids);

            const updatedCalendarEvents = calendar.calendarEvents.concat({
                id: id,
                title: 'New Event',
                start: info.date,
                end: moment(info.date).add(1, 'hours').toDate()
            })

            console.log(updatedCalendarEvents);

            setCalendar({
                ...calendar,
                calendarEvents: updatedCalendarEvents
            })

            console.log(calendar);
        }
    }

    const handleEventResize = (info: any) => {


        const updatedCalendarEvents: ICalendarEvents[] = calendar.calendarEvents.map(event => {

            if (event?.id === parseInt(info.event.id)) {
                console.log('can update');

                return {
                    ...event,
                    end: info.event.end
                }
            } else {
                console.log('cannot update');
                return event;
            }
        })

        if (updatedCalendarEvents) {
            setCalendar({
                ...calendar,
                calendarEvents: updatedCalendarEvents
            })
        }

    }

    const handleEventDrop = (info: any) => {

        const updatedCalendarEvents = calendar.calendarEvents.map(event => {

            console.log(info);
            
            if (event?.id === parseInt(info.event.id)) {
                console.log('can drop');
                return {
                    ...event,
                    start: info.event.start,
                    end: info.event.end
                }
            } else {
                console.log('cannot drop');
                return event;
            }
        })

        console.log(updatedCalendarEvents);

        if (updatedCalendarEvents) {
            setCalendar({
                ...calendar,
                calendarEvents: updatedCalendarEvents
            })
        }
    }




    return (
        <div className='demo-app'>
            <div className='demo-app-top'>
                <button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
                    <button onClick={gotoPast}>go to a date in the past</button>&nbsp;
                        (also, click a date/time to add an event)
            </div>
            <div className="main">
                <DraggableEvent />
                <div className='demo-app-calendar'>
                    <FullCalendar
                        defaultView="timeGridWeek"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
                        ref={calendarComponentRef}
                        // weekends={calendar.calendarWeekends}
                        events={calendar.calendarEvents}
                        dateClick={handleDateClick}
                        rerenderDelay={10}
                        editable={true}
                        droppable={true}
                        eventResize={handleEventResize}
                        eventDrop={handleEventDrop}
                    />
                </div>
            </div>
        </div>
    )
}




