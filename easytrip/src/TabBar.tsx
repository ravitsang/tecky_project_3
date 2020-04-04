import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar, Theme, createStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Responsive from "react-responsive";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    tabs: {
      color: "#444444"
    },
    tab: {
      [theme.breakpoints.up('sm')]: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: 16,
        minWidth: 120
      },
      [theme.breakpoints.down('sm')]: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: 16,
        minWidth: 70
      }
    },
    indicator: {
      backgroundColor: "#333333"
    }

  }))


export interface ITabBarProps{

  tabState:number

}


export function TabBar(props:ITabBarProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.tabState);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  const dispatch = useDispatch();

  //因為個TabBar唔係好似Navbar咁樣分開放，而係放左係每一頁入面，一撳完會重新個State變返做0，再撳多下先會變。





  return (
    <Responsive minWidth={600}>
      <Paper className={classes.root} >
        <div>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            classes={{
              indicator: classes.indicator
            }}
            centered
          >
            <Tab onClick={() => dispatch(push('/attraction'))} className={classes.tab} label="Attraction" />
            <Tab onClick={() => dispatch(push('/calendar'))} className={classes.tab} label="Calender" />
            <Tab onClick={() => dispatch(push('/itinerary'))} className={classes.tab} label="Itinerary" />
            <Tab onClick={() => dispatch(push('/maps'))} className={classes.tab} label="Map" />
          </Tabs>
        </div>
      </Paper>
    </Responsive>

  );
}