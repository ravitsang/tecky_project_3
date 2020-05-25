import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/dayGrid'
import momentPlugin from '@fullcalendar/moment';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { ExternalEvent } from './ExternalEvent'

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import './DndCalendar.scss'
import './FullcalendarStyle.scss'
import Responsive from "react-responsive";

import { TabBar } from '../TabBar'
import { useDispatch, useSelector } from 'react-redux'
import { resizeEvent, moveEvent, addExternalEvent, deleteExternalEventList, displayEventClick, addStartEndEvent, updateConstraint } from '../trip/actions'
import { IRootState } from '../store'
import { EventModal } from './EventModal';
import { EventSnackbar } from './SnackBar';

// import {ToastDismissExample} from './Toasts'
// import { AddEventModal } from './AddEventModal';
import { AddEventPopover } from './AddEventPopover';
import { AddEventForm } from './AddEventForm';
import { Grid } from '@material-ui/core';

export function DndCalendar() {

    const calendarComponentRef = React.createRef<FullCalendar>()

    const dispatch = useDispatch();

    const calendarEvents = useSelector((state: IRootState) => state.trip.calendarEvents)
    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)
    const eventTimeConstraint = useSelector((state: IRootState) => state.trip.eventTimeConstraint)

    console.log(tripSchedule.city);
    const startDate = tripSchedule.dateInfor[0].startDate;
    const endDate = tripSchedule.dateInfor[1].endDate;

    const start = Date.parse((startDate ? startDate : ""));
    const end = Date.parse((endDate ? endDate : ""));

    let startConstraint: any = new Date(eventTimeConstraint[0]);
    let endConstraint: any = new Date(eventTimeConstraint[1]);

    const [isShowingPopover, setIsShowingPopover] = useState(false);
    const [mouseEvent, setMouseEvent] = useState(false);
    const [eventInfo, setEventInfo] = useState();

    const [isShowingForm, setIsShowingForm] = useState(false);

    const [isShowingAddEventMessage, setIsShowingAddEventMessage] = useState(false)


    console.log(calendarEvents);

    function popOverToggle() {
        setIsShowingPopover(isShowingPopover => !isShowingPopover);
    }

    const addEventFormToggle = React.useCallback(function () {
        setIsShowingForm(isShowingForm => !isShowingForm);
    }, [setIsShowingForm]);

    function showAddEventMessageToggle() {
        setIsShowingAddEventMessage(!isShowingAddEventMessage);
    }


    // const [isShowingSnack, setIsShowingSnack] = useState(false);

    function snackToggle() {
        setIsShowingAddEventMessage(!isShowingAddEventMessage);
    }

    let countDay = (end - start) / 1000 / 60 / 60 / 24 + 1;
    console.log(countDay);
    useEffect(() => {
        let draggableEl: HTMLElement | null = document.getElementById("external-events");
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event"
            });
        }
        if (calendarEvents.length === 0) {
            dispatch(addStartEndEvent())
        }

    }, [dispatch])


    const addEventMessage = "Event added successfully"

    const handleDateClick = (info: any) => {

        setIsShowingPopover(false)

        console.log(info.date);
        console.log(eventTimeConstraint);
        console.log(new Date(startConstraint));

        console.log(info.date - startConstraint);
        if (info.date - startConstraint > 0 && info.date - endConstraint < 0) {
            setMouseEvent(info.jsEvent) // need to use setstate to store mouseEvent?
            setIsShowingPopover(true)
            setEventInfo(info)
            // setIsShowingSnack(true)

            console.log('handleDateClick');

        } else {
            console.log('cannot add event');
        }



    }

    const handleEventResize = (info: any) => {

        dispatch(resizeEvent(info))

    }

    const handleEventDrop = (info: any) => {

        dispatch(moveEvent(info));


        console.log(info.oldEvent.id);
        if (info.oldEvent.id === '1' || info.oldEvent.id === '2') {
            dispatch(updateConstraint(parseInt(info.oldEvent.id)))
        }
        console.log(info);

    }


    const handleExternalEventDrop = (info: any) => {

        console.log(info.date - startConstraint > 0);

        console.log(info.date);
        console.log(startConstraint);

        if (info.date - startConstraint > 0 && info.date - endConstraint < 0) {
            console.log(info.date);
            dispatch(addExternalEvent(info));
            dispatch(deleteExternalEventList(info));
            console.log('handleExternalEventDrop');
        }


    }


    let eventClick = null;
    const handleEventClick = (info: any) => {


        dispatch(displayEventClick(info));


        console.log('handleEventClick');


    }

    return (

        <div>



            <TabBar tabState={1}/>
            <div className="calendar-page">
                {/* <div className='demo-app-top'>
                        <button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
                    <button onClick={gotoPast}>go to a date in the past</button>&nbsp;
                    (also, click a date/time to add an event)
                    </div> */}

                {
                    isShowingPopover && <AddEventPopover
                        isShowing={isShowingPopover}
                        hide={popOverToggle}
                        isShowingForm={addEventFormToggle}
                        mouseEvent={mouseEvent}
                        eventInfo={eventInfo} />
                }
                {
                    isShowingForm &&
                    <AddEventForm
                        isShowing={isShowingForm}
                        hide={addEventFormToggle}
                        eventInfo={eventInfo}
                        showAddEventMessageToggle={showAddEventMessageToggle} />
                }
                {
                    isShowingAddEventMessage &&
                    <EventSnackbar
                        message={addEventMessage}
                        isShowing={isShowingAddEventMessage}
                        hide={snackToggle} />
                }


                <div className='demo-app-calendar'>
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <ExternalEvent />
                        </Grid>
                        <Grid item xs={10}>
                            <div className='calendar-title-column'>
                                <div className="calendar-title">{tripSchedule.city ? tripSchedule.city : 'City'} </div>
                            </div>
                            <Responsive minWidth={1440}>
                                <FullCalendar
                                    defaultView="timeGrid"
                                    dayCount={countDay < 5 ? countDay : 5}
                                    header={{
                                        left: 'prev',
                                        center: '',
                                        right: 'next'
                                    }}
                                    // titleFormat="\'Hello, World!\'"
                                    plugins={[timeGridPlugin, interactionPlugin, listPlugin, momentPlugin]}
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
                                    eventOverlap={false}
                                    // aspectRatio={1.7}
                                    // schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                                />

                            </Responsive>
                            <Responsive minWidth={600} maxWidth={1439}>
                                <FullCalendar
                                    defaultView="timeGrid"
                                    dayCount={countDay < 5 ? countDay : 4}
                                    header={{
                                        left: 'prev',
                                        center: '',
                                        right: 'next'
                                    }}
                                    // titleFormat="\'Hello, World!\'"
                                    plugins={[timeGridPlugin, interactionPlugin, listPlugin, momentPlugin]}
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
                                    eventOverlap={false}
                                    aspectRatio={1.7}

                                    // schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                                />

                            </Responsive>
                            <Responsive maxWidth={599}>
                                <FullCalendar
                                    defaultView="timeGridDay"
                                    dayCount={countDay < 5 ? countDay : 5}
                                    header={{
                                        left: 'prev',
                                        center: '',
                                        right: 'next'
                                    }}
                                    // titleFormat="\'Hello, World!\'"
                                    plugins={[timeGridPlugin, interactionPlugin, listPlugin, momentPlugin]}
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
                                    eventOverlap={false}
                                    aspectRatio={1.7}
                                    // schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                                />
                            </Responsive>
                        </Grid>
                    </Grid>
                </div>
                {eventClick && <EventModal />}

            </div>
        </div>

    )
}




