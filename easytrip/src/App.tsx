import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
// import { Navbar, NavItem } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { history } from './store';

import { ShowItinerary } from './ShowItinerary';
import { ReactGoogleMaps } from './Map/ReactGoogleMaps';
import Calendar from './Calendar/Calendar';
import { EntryForm } from './EntryForm';
import { MainNav } from './MainNav';
// import { useDispatch } from 'react-redux';

import { MarkerClusterComponent } from './Map/MarkerClusterer';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndCalendar } from './DndCalendar/DndCalendar';





import  { ShowAttraction }  from './ShowAttraction';

export function App() {
  // const dispatch = useDispatch();
  return (
    <ConnectedRouter history={history}>
      <MainNav />
      <Switch>
        <Route path='/' exact={true} component={EntryForm}/>
        <Route path='/attraction' component={ShowAttraction}/>
        <Route path='/itinerary' component={ShowItinerary}/>
        <Route path='/map' component={MarkerClusterComponent}/>
        <Route path='/calendar' component={DndCalendar} />


      </Switch>
    </ConnectedRouter>
  );
}
