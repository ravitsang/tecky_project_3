import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'

import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { ExternalEvent } from './ExternalEvent'

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import './DndCalendar.scss'
import './MaterialDesign.scss'


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

export function DndCalendar() {

    const calendarComponentRef = React.createRef<FullCalendar>()

    const dispatch = useDispatch();

    const calendarEvents = useSelector((state: IRootState) => state.trip.calendarEvents)
    const tripSchedule = useSelector((state: IRootState) => state.trip.tripSchedule)
    const eventTimeConstraint = useSelector((state: IRootState) => state.trip.eventTimeConstraint)

    const startDate = tripSchedule.dateInfor[0].startDate;
    const endDate = tripSchedule.dateInfor[1].endDate;

    const start = Date.parse((startDate ? startDate : ""));
    const end = Date.parse((endDate ? endDate : ""));

    let startConstraint: any = eventTimeConstraint[0];
    let endConstraint: any = eventTimeConstraint[1];

    const [isShowingPopover, setIsShowingPopover] = useState(false);
    const [mouseEvent, setMouseEvent] = useState(false);
    const [eventInfo, setEventInfo] = useState();

    const [isShowingForm, setIsShowingForm] = useState(false);

    const [isShowingAddEventMessage, setIsShowingAddEventMessage] = useState(false)




    function popOverToggle() {
        setIsShowingPopover(!isShowingPopover);
    }

    function addEventFormToggle() {
        setIsShowingForm(!isShowingForm);
    }

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
        dispatch(addStartEndEvent())

    }, [])


    const addEventMessage = "Event added successfully"

    const handleDateClick = (info: any) => {

        setIsShowingPopover(false)

        console.log(info);

        if (info.date - startConstraint > 0 && info.date - endConstraint < 0) {
            setMouseEvent(info.jsEvent) // need to use setstate to store mouseEvent?
            setIsShowingPopover(true)
            setEventInfo(info)
            // setIsShowingSnack(true)
            // if(isAddEvent){
            //     dispatch(addEvent(info))
            //     console.log('addEvent');
            // }
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
            <div className='tab-column'>
                <TabBar />
            </div>
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
                <ExternalEvent />
                <div>
                    <div className='demo-app-calendar'>
                        <FullCalendar
                            defaultView="timeGrid"
                            dayCount={countDay < 5 ? countDay : 5}
                            header={{
                                left: 'prev',
                                center: '',
                                right: 'next'
                            }}
                            // titleFormat={'[Hong Kong]'}
                            plugins={[timeGridPlugin, interactionPlugin, listPlugin]}
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
                            // displayEventTime={false}
                            aspectRatio={1.7}
                            dateIncrement={{ day: 1 }}
                            // eventConstraint={
                            //     {
                            //         start: calendarEvents[0]?.start,
                            //         end: calendarEvents[1]?.end
                            //     }
                            // }
                            // visibleRange={
                            //     {
                            //         start: '2020-03-01',
                            //         end: '2020-03-30'
                            //     }
                            // }

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




