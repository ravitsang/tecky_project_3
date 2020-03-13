import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { history } from './store';
// import { useDispatch } from 'react-redux';

export function App() {
  // const dispatch = useDispatch();
  return (
    <ConnectedRouter history={history}>
      <Navbar>
        <NavItem><Link to="/">Home</Link></NavItem>

      </Navbar>
      <Switch>
        <Route path='/' />
      </Switch>
    </ConnectedRouter>
  );
}
