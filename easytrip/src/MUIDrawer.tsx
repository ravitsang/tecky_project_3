import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import ExploreIcon from '@material-ui/icons/Explore';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: '#FFFFFF'
        }
    }),
);

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export function MUIDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const dispatch = useDispatch()

    const handleOnClick = (text: any) => {

        if (text === "Attraction") {
            dispatch(push('/attraction'))
        } else if(text === "Calender"){
            dispatch(push('/calendar'))
        } else if(text === "Itinerary"){
            dispatch(push('/itinerary'))
        }else if(text === "Map"){
            dispatch(push('/maps'))
        }
    }


    const renderDrawerIcon = (text:any) =>{

        if (text === "Attraction") {
            return <ListItemIcon><ExploreIcon/></ListItemIcon>
        } else if(text === "Calender"){
            return <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
        } else if(text === "Itinerary"){
            return <ListItemIcon><ScheduleIcon/></ListItemIcon>
        }else if(text === "Map"){
            return <ListItemIcon><RoomIcon/></ListItemIcon>

        }
        
    }


const list = (anchor: Anchor) => (
    <div
        className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
            {["Attraction", "Calender", "Itinerary", "Map"].map((text, index) => (
                <ListItem button key={text}>
                    {renderDrawerIcon(text)}
                    <ListItemText primary={text} onClick={() => handleOnClick(text)} />

                </ListItem>
            ))}
        </List>
        <Divider />
    </div>
);

return (
    <div>
        {(['top'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)} className={classes.menuButton} >
                    <MenuIcon />
                </Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        ))}
    </div>
);
}
