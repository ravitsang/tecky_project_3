import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  tabs: {
    color: "#444444"
  },
  tab: {
    textTransform: "none",
    fontWeight: 'bold'
  }
});

export function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  //因為個TabBar唔係好似Navbar咁樣分開放，而係放左係每一頁入面，一撳完會重新個State變返做0，再撳多下先會變。



  return (

    <Paper className={classes.root} >
      <div>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
        >
          <Tab onClick={() => dispatch(push('/attraction'))} className={classes.tab} label="Select Attraction" />
          <Tab onClick={() => dispatch(push('/itinerary'))} className={classes.tab} label="Show Itinerary" />
          <Tab onClick={() => dispatch(push('/calendar'))} className={classes.tab} label="Calender" />
        </Tabs>
      </div>
    </Paper>

  );
}