import { ITripState } from './state';
import { ITripActions } from './actions';
import moment from 'moment';


let ids = [];
let id = 0;



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
    calendarEvents: [],
    tripEvents: [
        { id: 1, title: 'Ocean Park' },
        { id: 2, title: 'Nan Lian Garden' },
        { id: 3, title: 'Hong Kong Museum of History' },
        { id: 4, title: 'Hong Kong Museum of Medical Sciences' },
        { id: 5, title: 'Latau Island' },
        { id: 6, title: 'Hong Kong Railway Museum' },
        { id: 7, title: 'Tian Tan Buddha (Big Buddha)' },
    ],
    externalEvents: [
        { id: 1, title: 'Ocean Park' },
        { id: 2, title: 'Nan Lian Garden' },
        { id: 3, title: 'Hong Kong Museum of History' },
        { id: 4, title: 'Hong Kong Museum of Medical Sciences' },
        { id: 5, title: 'Latau Island' },
        { id: 6, title: 'Hong Kong Railway Museum' },
        { id: 7, title: 'Tian Tan Buddha (Big Buddha)' },
    ],
    eventTimeConstraint: []
}


export const tripReducer = (state: ITripState = initialState, action: ITripActions) => {



    let startDate = state.tripSchedule?.dateInfor[0].startDate ? state.tripSchedule.dateInfor[0].startDate : "";
    let endDate = state.tripSchedule?.dateInfor[1].endDate ? state.tripSchedule.dateInfor[1].endDate : "";


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

            console.log(state.calendarEvents);
            return {
                ...state,
                calendarEvents: state.calendarEvents.map(event => {

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
            }

        case "RESIZE_EVENT":

            console.log(state.calendarEvents);
            return {
                ...state,
                calendarEvents: state.calendarEvents.map(event => {

                    if (event?.id === parseInt(action.info.event.id)) {
                        console.log('can update');

                        return {
                            ...event,
                            end: action.info.event.end
                        }
                    } else {
                        console.log('cannot update');
                        return event;
                    }
                })
            }

        case "ADD_EVENT":

            console.log(state.calendarEvents);
            ids = state.calendarEvents.map(event => event.id)
            id = Math.max(...ids) + 1
            console.log(ids);

            return {
                ...state,
                calendarEvents: state.calendarEvents.concat({
                    id: id,
                    title: 'New Event',
                    start: action.info.date,
                    end: moment(action.info.date).add(2, 'hours').toDate(),
                    constraint:
                    {
                        start: state.eventTimeConstraint[0],
                        end: state.eventTimeConstraint[1]
                    }
                })
            }

        case "ADD_EXTERNAL_EVENT":

            console.log(state.calendarEvents);
            ids = state.calendarEvents.map(event => event.id)
            id = Math.max(...ids) + 1
            console.log(action.info.draggedEl.title);

            return {
                ...state,
                calendarEvents: state.calendarEvents.concat({
                    id: id,
                    title: action.info.draggedEl.title,
                    start: action.info.date,
                    end: moment(action.info.date).add(2, 'hours').toDate(),
                    constraint:
                    {
                        start: state.eventTimeConstraint[0],
                        end: state.eventTimeConstraint[1]
                    }
                })
            }

        case "DELETE_EXTERNAL_EVENT_LIST":
            return {
                ...state,
                externalEvents: state.externalEvents.filter(event => event.title !== action.info.draggedEl.title)
            }

        case "ADD_START_END_TIME":

            console.log(state.tripSchedule.dateInfor[0].endDate);
            return {
                ...state,
                eventTimeConstraint: [new Date(startDate), new Date(endDate)],
                calendarEvents: [
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
            }

        // case "DISPLAY_EVENT_CLICK":
        //     return {
        //         ...state,
        //         externalEvents: state.externalEvents.filter(event => event.title !== action.info.draggedEl.title)
        //     }

        case "UPDATE_CONSTRAINT":
            console.log(action.eventId);
            const updateTime = state.calendarEvents.find(event => event.id === action.eventId)
            const startTime = updateTime?.start ? updateTime?.start : new Date()
            const endTime = updateTime?.end ? updateTime?.end : new Date()


            console.log(updateTime);
            return {
                ...state,
                eventTimeConstraint: action.eventId === 1 ? [startTime, state.eventTimeConstraint[1]] : [state.eventTimeConstraint[0], endTime],
                calendarEvents: state.calendarEvents.map(event => {

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
            }


        default:
            console.log(action);
            return state
    }

}