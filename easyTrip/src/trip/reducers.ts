import { ITripState, ITripEvents } from './state';
import { ITripActions } from './actions';
import moment, { duration } from 'moment';


let calendarEventsIds = [];
let calendarEventsId = 0;



const initialState: ITripState = {

    tripSchedule: localStorage.getItem("tripSchedule") ? JSON.parse(localStorage.getItem("tripSchedule") || "{}") : {
        city: "",
        dateInfor: [
            {
                startDate: undefined,
                endDate: undefined,
                year: 0,
                month: [],
                days: []
            },
            {
                startDate: undefined,
                endDate: undefined,
                year: 0,
                month: [],
                days: []
            }],
        tripDays: 0
    },
    // events used for fullcalendar
    calendarEvents: localStorage.getItem('calendarEvents') ? JSON.parse(localStorage.getItem('calendarEvents') || '[]') : [],
    // events that will be display in the iternary 
    tripEvents: localStorage.getItem('tripEvents') ? JSON.parse(localStorage.getItem('tripEvents') || '[]') : [],
    // evnets that was added in show attraction page
    externalEvents: localStorage.getItem('externalEvents') ? JSON.parse(localStorage.getItem('externalEvents') || '[]') : [],
    eventTimeConstraint:  localStorage.getItem('eventTimeConstraint') ? JSON.parse(localStorage.getItem('eventTimeConstraint') || '[]') : [],
}


export const tripReducer = (state: ITripState = initialState, action: ITripActions) => {



    let startDate = state.tripSchedule?.dateInfor[0].startDate ? state.tripSchedule.dateInfor[0].startDate : "";
    let endDate = state.tripSchedule?.dateInfor[1].endDate ? state.tripSchedule.dateInfor[1].endDate : "";


    let startTime: Date
    let endTime: Date

    let calendarEventsString = ""
    let calendarEvents = []


    let tripEventsString = ""
    let tripEvents:ITripEvents[]= []

    let eventTimeConstraint = []

    switch (action.type) {

        case "GET_TRIPDETAIL":

            // console.log(state);
            return {
                ...state
            }

        case "STORE_DAYS":

            // console.log(action.daysInfor);
            return {
                ...state,
                dateInfor: action.daysInfor
            }

        case "MOVE_EVENT":

            calendarEvents = state.calendarEvents.map(event => {

                if (event.id === parseInt(action.info.event.id)) {
                    console.log('can drop');
                    return {
                        ...event,
                        start: action.info.event.start,
                        end: action.info.event.end
                    }
                } else {
                    console.log('cannot drop');
                    return event;
                }
            })

            localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));

            tripEvents = state.tripEvents.map(event => {

                if (event.calendarEventsId === parseInt(action.info.event.id)) {

                    console.log('can drop');
                    return {
                        ...event,
                        startTime: action.info.event.start,
                        endTime: action.info.event.end
                    }
                } else {
                    console.log('cannot drop');
                    return event;
                }
            })

            localStorage.setItem('tripEvents', JSON.stringify(tripEvents));

            return {
                ...state,
                calendarEvents: calendarEvents,
                tripEvents:tripEvents

            }

        case "RESIZE_EVENT":


            calendarEvents = state.calendarEvents.map(event => {

                if (event.id === parseInt(action.info.event.id)) {
                    console.log('can drop');
                    return {
                        ...event,
                        start: action.info.event.start,
                        end: action.info.event.end
                    }
                } else {
                    console.log('cannot drop');
                    return event;
                }
            })

            localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));


            tripEvents = state.tripEvents.map(event => {

                if (event.calendarEventsId === parseInt(action.info.event.id)) {

                    console.log('can drop');
                    return {
                        ...event,
                        startTime: action.info.event.start,
                        endTime: action.info.event.end
                    }
                } else {
                    console.log('cannot drop');
                    return event;
                }
            })

            localStorage.setItem('tripEvents', JSON.stringify(tripEvents));

            return {
                ...state,
                calendarEvents: calendarEvents,
                tripEvents:tripEvents
            }

        case "ADD_EVENT":


            calendarEventsIds = state.calendarEvents.map(event => event.id)
            calendarEventsId = Math.max(...calendarEventsIds) + 1


            let tripEventIds = state.tripEvents.map(event => event.calendarEventsId);
            const tripEventId = tripEventIds.length === 0 ? 1 : Math.max(...tripEventIds) + 1

            startTime = new Date(moment(action.eventDetail.date).format().split('T')[0] + " " + action.eventDetail.startTime)
            endTime = new Date(moment(action.eventDetail.date).format().split('T')[0] + " " + action.eventDetail.endTime)




            tripEvents = state.tripEvents.concat({
                tripEventsId: tripEventId,
                calendarEventsId:calendarEventsId,
                title: action.eventDetail.eventName,
                location: action.eventDetail.location,
                description: action.eventDetail.description,
                startTime: startTime,
                endTime: endTime,
                duration: action.eventDetail.duration
            });

            localStorage.setItem('tripEvents', JSON.stringify(tripEvents));


            calendarEvents = state.calendarEvents.concat({
                id: calendarEventsId,
                title: action.eventDetail.eventName,
                start: startTime,
                end: endTime,
                constraint:
                {
                    start: state.eventTimeConstraint[0],
                    end: state.eventTimeConstraint[1]
                }
            })

            // console.log(tripEvents);
            localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));

            return {
                ...state,
                calendarEvents:calendarEvents,
                tripEvents: tripEvents
            }

        case "ADD_EXTERNAL_EVENT":

            console.log(state.calendarEvents);
            calendarEventsIds = state.calendarEvents.map(event => event.id)
            calendarEventsId = Math.max(...calendarEventsIds) + 1
            console.log(action.info.draggedEl.title);


            const tripEventsIds = state.tripEvents.map(event => event.tripEventsId)
            const tripEventsId = tripEventsIds.length !== 0 ? Math.max(...tripEventsIds) + 1 : 1
            console.log(tripEventsIds);
            console.log(tripEventsId);

            const attraction = state.externalEvents.find(event => event.attractionId === parseInt(action.info.draggedEl.id))


            console.log(attraction);

            tripEvents = state.tripEvents.concat({
                tripEventsId: tripEventsId,
                calendarEventsId:calendarEventsId,
                title: action.info.draggedEl.title,
                location: attraction?.location,
                description: attraction?.description,
                startTime: action.info.date,
                endTime: moment(action.info.date).add(2, 'hours').toDate(),
                telephone: attraction?.telephone,
                url: attraction?.url,
                attraction_image: attraction?.attraction_image,
                duration: action.info.duration
            })

            localStorage.setItem('tripEvents', JSON.stringify(tripEvents));


            calendarEvents = state.calendarEvents.concat({
                id: calendarEventsId,
                title: action.info.draggedEl.title,
                start: action.info.date,
                end: moment(action.info.date).add(2, 'hours').toDate(),
                constraint:
                {
                    start: state.eventTimeConstraint[0],
                    end: state.eventTimeConstraint[1]
                }
            })

            localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));

            return {
                ...state,
                calendarEvents: calendarEvents,
                tripEvents:tripEvents
            }

        case "DELETE_EXTERNAL_EVENT_LIST":
            console.log(state.externalEvents);

            
            const externalEvents = state.externalEvents.filter(event => event.name !== action.info.draggedEl.title)

            localStorage.setItem('externalEvents', JSON.stringify(externalEvents));

            return {
                ...state,
                externalEvents: externalEvents
            }

        case "ADD_START_END_TIME":

            
            eventTimeConstraint = [new Date(startDate), new Date(endDate)]
            console.log(eventTimeConstraint);
            localStorage.setItem('eventTimeConstraint', JSON.stringify(eventTimeConstraint));

            calendarEvents = [
                {
                    id: 1,
                    title: 'Arrival',
                    start: new Date(startDate),
                    end: moment(new Date(startDate))
                        .add(0.5, 'hours').toDate(),
                    overlap: false,
                    backgroundColor: "#FAFAFA",
                    durationEditable: false,
                    constraint:
                    {
                        end: new Date(endDate)
                    }
                },
                {
                    id: 2,
                    title: 'Departure',
                    start: new Date(endDate),
                    end: moment(new Date(endDate)).add(0.5, 'hours').toDate(),
                    overlap: false,
                    backgroundColor: "#FAFAFA",
                    durationEditable: false,
                    constraint:
                    {
                        start: new Date(startDate)
                    }
                }
            ]


            localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));


            console.log(state.tripSchedule.dateInfor[0].endDate);
            return {
                ...state,
                eventTimeConstraint: eventTimeConstraint,
                calendarEvents: calendarEvents
            }

        // case "DISPLAY_EVENT_CLICK":
        //     return {
        //         ...state,
        //         externalEvents: state.externalEvents.filter(event => event.title !== action.info.draggedEl.title)
        //     }

        case "UPDATE_CONSTRAINT":
            console.log(action.eventId);
            const updateTime = state.calendarEvents.find(event => event.id === action.eventId)
            startTime = updateTime?.start ? updateTime?.start : new Date()
            endTime = updateTime?.end ? updateTime?.end : new Date()

            eventTimeConstraint = action.eventId === 1 ? [startTime, state.eventTimeConstraint[1]] : [state.eventTimeConstraint[0], endTime]

            localStorage.setItem('eventTimeConstraint', JSON.stringify(eventTimeConstraint));

            // console.log(updateTime);

            calendarEvents = state.calendarEvents.map(event => {

                if (event.id !== 1 && action.eventId === 1) {
                    console.log('update start time constraint');
                    return {
                        ...event,
                        constraint:
                        {
                            ...event.constraint,
                            start: updateTime?.start
                        }
                    }
                } else if (event.id !== 2 && action.eventId === 2) {
                    console.log('update end time constraint');
                    return {
                        ...event,
                        constraint:
                        {
                            ...event.constraint,
                            end: updateTime?.end
                        }
                    }
                } else {
                    return event
                }
            })


            localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
            
            return {
                ...state,
                eventTimeConstraint: eventTimeConstraint,
                calendarEvents: calendarEvents
            }

        case "GET_DRIVING":
            return{
                ...state,
                
            }
        case "GET_TRANSIT":
            return{
                ...state
            }
        default:
            console.log(action);
            return state
    }

}