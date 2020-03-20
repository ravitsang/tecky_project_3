import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
// import { Navbar, NavItem } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { history } from './store';

import { ShowItinerary } from './ShowItinerary';
import { ReactGoogleMaps } from './ReactGoogleMaps';
import Calendar from './Calendar/Calendar';
import { EntryForm } from './EntryForm';
import { MainNav } from './MainNav';
// import { useDispatch } from 'react-redux';
import { MarkerClustererComponent } from './MarkerClusterer';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  // const dispatch = useDispatch();
  return (
    <ConnectedRouter history={history}>
      <MainNav />
      <Switch>
        <Route path='/' exact={true} component={EntryForm}/>
        <Route path='/itinerary' component={ShowItinerary}/>
        <Route path='/map' component={MarkerClustererComponent}/>
        <Route path='/calendar' component={Calendar} />
      </Switch>
    </ConnectedRouter>
  );
}
