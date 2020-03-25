import { ITripState } from './state';
import { ITripActions } from './actions';
import moment from 'moment';


let ids = [];
let id = 0;


const initialState = {

    tripSchedule: localStorage.getItem("tripSchedule") ? JSON.parse(localStorage.getItem("tripSchedule") || "{}") : "{}",
    calendarEvents: [
        {
            id: 1,
            title: 'Event Now',
            start: new Date(),
            end: moment(new Date()).add(2, 'hours').toDate()
        }
    ],
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
    ]
}


export const tripReducer = (state: ITripState = initialState, action: ITripActions) => {

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
                    end: moment(action.info.date).add(1, 'hours').toDate()
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
                    end: moment(action.info.date).add(1, 'hours').toDate()
                })
            }

        case "DELETE_EXTERNAL_EVENT_LIST":
            return {
                ...state,
                externalEvents: state.externalEvents.filter(event => event.title !== action.info.draggedEl.title)
            }


        default:
            console.log(action);
            return state
    }

}