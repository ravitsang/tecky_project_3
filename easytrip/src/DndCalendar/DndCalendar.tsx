import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
// import { EventInput, Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { ExternalEvent } from './ExternalEvent'


import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import './DndCalendar.scss'
import './MaterialDesign.scss'


import { TabBar } from '../TabBar'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, resizeEvent, moveEvent, addExternalEvent, deleteExternalEventList } from '../trip/actions'
import { IRootState } from '../store'



export function DndCalendar() {

    const calendarComponentRef = React.createRef<FullCalendar>()

    const dispatch = useDispatch();

    const calendarEvents = useSelector((state: IRootState) => state.trip.calendarEvents)


    console.log(calendarEvents);
    useEffect(() => {
        let draggableEl: HTMLElement | null = document.getElementById("external-events");
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event"
            });
        }
    }, [])


    const handleDateClick = (info: any) => {
        if (window.confirm('Would you like to add an event to ' + info.dateStr + ' ?')) {

            dispatch(addEvent(info))
        }
    }

    const handleEventResize = (info: any) => {

        dispatch(resizeEvent(info))

    }

    const handleEventDrop = (info: any) => {

        dispatch(moveEvent(info));

    }


    const handleExternalEventDrop = (info: any) => {

        dispatch(addExternalEvent(info));
        dispatch(deleteExternalEventList(info));
        console.log('handleExternalEventDrop');


    }

    const handleEventClick = (info: any) => {

        console.log('handleEventClick');


    }

    return (

        <div>
            <div className='test'>
                <TabBar />
            </div>
            <div className="main">
                {/* <div className='demo-app-top'>
                        <button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
                    <button onClick={gotoPast}>go to a date in the past</button>&nbsp;
                    (also, click a date/time to add an event)
                    </div> */}
                {console.log("test")}
                <ExternalEvent />
                <div>
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
                            weekends={false}
                            events={calendarEvents}
                            rerenderDelay={10}
                            editable={true}
                            droppable={true}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            eventResize={handleEventResize}
                            eventDrop={handleEventDrop}
                            drop={handleExternalEventDrop}

                            validRange={{
                                start: '2020-03-22',
                                end: '2020-03-26'
                            }}
                            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}




