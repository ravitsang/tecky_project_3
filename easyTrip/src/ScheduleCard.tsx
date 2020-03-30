import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { FaLandmark } from 'react-icons/fa';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IScheduleItem } from './scheduleItem/state';

interface IScheduleCardProps extends RouteComponentProps {
  binOnClick: () => void
  scheduleItem: IScheduleItem
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      width: 280,
      maxWidth: 280
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

export function ScheduleCard(props: IScheduleCardProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className={classes.demo}>
            <List>
              {
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FaLandmark />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={props.scheduleItem.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => props.binOnClick()}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              }
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export function EmptyScheduleCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
              {
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FaLandmark />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="No selected attraction"
                  />
                </ListItem>
              }
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(ScheduleCard)