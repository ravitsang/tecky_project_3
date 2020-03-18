import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  tabs:{
      color: "#444444"
  },
  tab:{
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

  return (
    <Paper className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
      >
        <Tab className={classes.tab} label="Select Attraction"/>
        <Tab className={classes.tab} label="Show Itinerary" />
        <Tab className={classes.tab} label="Calender" />
      </Tabs>
    </Paper>
  );
}