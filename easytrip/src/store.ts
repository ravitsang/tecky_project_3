import { ITripActions } from './trip/actions';
import { tripReducer } from './trip/reducers';
import { ITripState } from './trip/state';
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import { RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk, { ThunkDispatch as OldThunkDispatch } from "redux-thunk";



export const history = createBrowserHistory();


export interface IRootState {

  router: RouterState
  trip: ITripState
}

 
export type IRootAction =  CallHistoryMethodAction | ITripActions


const rootReducer = combineReducers<IRootState>({
  router: connectRouter(history), 
  trip: tripReducer
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
