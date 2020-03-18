import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { history } from './store';
import Calendar from './Calendar/Calendar';
import { EntryForm } from './EntryForm';
import { MainNav } from './MainNav';
// import { useDispatch } from 'react-redux';

export function App() {
  // const dispatch = useDispatch();
  return (
    <ConnectedRouter history={history}>
      <MainNav />
      <Switch>
        <Route path='/' component={Calendar} />
      </Switch>
    </ConnectedRouter>
  );
}
