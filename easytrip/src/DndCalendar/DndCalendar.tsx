import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import './DndCalendar.scss'
import { DraggableEvent } from './DraggableEvent'



let calendarData = {

    calendarWeekends: true,
    calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() }
    ]

}


export function DemoApp() {

    const calendarComponentRef = React.createRef<FullCalendar>()


    const [calendar, setCalendar] = useState(calendarData);

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

    const handleDateClick = (arg: any) => {
        if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {

            setCalendar({
                ...calendar,
                calendarEvents: calendar.calendarEvents.concat({
                    title: 'New Event',
                    start: arg.date
                    // allDay: arg.allDay
                })
            })
        }
    }


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
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={calendarComponentRef}
                        weekends={calendar.calendarWeekends}
                        events={calendar.calendarEvents}
                        dateClick={handleDateClick}
                        rerenderDelay={10}
                        eventDurationEditable={false}
                        editable={true}
                        droppable={true}
                    />
                </div>
            </div>
        </div>
    )
}




