import { ITripActions } from './trip/actions';
import { tripReducer } from './trip/reducers';
import { ITripState } from './trip/state';
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import { RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk, { ThunkDispatch as OldThunkDispatch } from "redux-thunk";
import { IAttractionActions } from './attraction/actions';
import { IAttractionState } from './attraction/state';
import { attractionReducer } from './attraction/reducers';
import { IScheduleItemState } from './scheduleItem/state';
import { scheduleItemReducer } from './scheduleItem/reducer';
import { IScheduleItemActions } from './scheduleItem/actions';



export const history = createBrowserHistory();


export interface IRootState {

  router: RouterState
  trip: ITripState
  attraction: IAttractionState
  scheduleItem: IScheduleItemState
}

 
export type IRootAction =  CallHistoryMethodAction | ITripActions | IAttractionActions | IScheduleItemActions


const rootReducer = combineReducers<IRootState>({
  router: connectRouter(history), 
  trip: tripReducer,
  attraction: attractionReducer,
  scheduleItem: scheduleItemReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type ThunkDispatch = OldThunkDispatch<IRootState, null, IRootAction>;

export default createStore<IRootState, IRootAction, {}, {}>(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);
