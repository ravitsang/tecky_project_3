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
import { addEvent, resizeEvent, moveEvent, addExternalEvent, deleteExternalEventList, displayEventClick, addStartEndTime } from '../trip/actions'
import { IRootState } from '../store'
import { EventModal } from './EventModal';



export function DndCalendar() {

    const calendarComponentRef = React.createRef<FullCalendar>()

    const dispatch = useDispatch();

    const calendarEvents = useSelector((state: IRootState) => state.trip.calendarEvents)
    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)

    console.log(tripSchedule);
    console.log(calendarEvents);
    let startMonth = tripSchedule.dateInfor[0].month[1]
    let endMonth = tripSchedule.dateInfor[1].month[1]
    const lastDayIndex = tripSchedule.dateInfor[1].days.length-1;
    let endDay = tripSchedule.dateInfor[1].days[lastDayIndex]


    const startDate = `${tripSchedule.dateInfor[0].year}-${startMonth.length < 2 ? 0 + startMonth : startMonth}-${tripSchedule.dateInfor[0].days[0]}`
    const endDate = `${tripSchedule.dateInfor[1].year}-${endMonth.length < 2 ? 0 + endMonth : endMonth}-${endDay < 10 ? 0 + endMonth.toString() : endMonth}`


    console.log(startDate);
    console.log(endDate);

    useEffect(() => {
        let draggableEl: HTMLElement | null = document.getElementById("external-events");
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event"
            });
        }
        dispatch(addStartEndTime(startDate,endDate))
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


    let eventClick = null;
    const handleEventClick = (info: any) => {

        
        dispatch(displayEventClick(info));


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
                            defaultView="timeGrid"
                            dayCount={5}
                            header={{
                                left: 'prev',
                                center: 'title',
                                right: 'next'
                            }}
                            // titleFormat={'[Hong Kong]'}
                            plugins={[timeGridPlugin, interactionPlugin]}
                            ref={calendarComponentRef}
                            events={calendarEvents}
                            // rerenderDelay={10}
                            editable={true}
                            droppable={true}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            eventResize={handleEventResize}
                            eventDrop={handleEventDrop}
                            drop={handleExternalEventDrop}
                            allDaySlot={false}
                            defaultDate={startDate}
                            slotDuration={'00:60:00'}
                            // displayEventTime={false}
                            aspectRatio={1.7}
                            dateIncrement={{day:1}}
                            visibleRange={
                                {
                                    start: '2020-03-01',
                                    end: '2020-03-30'
                                }
                            }
                            // timeGridEventMinHeight={30}
                            // scrollTime={'12:00:00'}
                            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                        />
                    </div>
                </div>
                {eventClick && <EventModal />}
            </div>

        </div>
    )
}




