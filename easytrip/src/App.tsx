import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
// import { Navbar, NavItem } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { history } from './store';
import { MainNav } from './MainNav';
import { EntryForm } from './EntryForm';
import { ShowItinerary } from './ShowItinerary';
import { ReactGoogleMaps } from './ReactGoogleMaps';
// import { useDispatch } from 'react-redux';
import { MarkerClustererComponent } from './MarkerClusterer';

export function App() {
  // const dispatch = useDispatch();
  return (
    <ConnectedRouter history={history}>
      <MainNav />
      <Switch>
        <Route path='/' exact={true} component={EntryForm}/>
        <Route path='/itinerary' component={ShowItinerary}/>
        <Route path='/map' component={MarkerClustererComponent}/>
      </Switch>
    </ConnectedRouter>
  );
}
