/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, InputLabel, makeStyles, createStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }),
);

export interface IMUITimePicker {
    startTime: string
    handleStartTimeChange: (event: any, newValue: TimeOptionType | null) => void
    endTime: string
    handleEndTimeChange: (event: any, newValue: TimeOptionType | null) => void
  }


export function MUITimePicker(props: IMUITimePicker) {

  const classes = useStyles();

  const defaultProps = {
    options: allDayTime,
    getOptionLabel: (option: TimeOptionType) => option.time,
  };

  return (

    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Start Time
        </InputLabel>
        <div style={{ width: 130 }}>
          <Autocomplete
            {...defaultProps}
            value={{ time: props.startTime }}
            onChange={(event: any, newValue: TimeOptionType | null)=> props.handleStartTimeChange(event,newValue)}
            id="clear-on-escape"
            clearOnEscape
            renderInput={params => (
              <TextField {...params} margin="normal" />
            )}
          />
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          End time
        </InputLabel>
        <div style={{ width: 130 }}>
          <Autocomplete
            {...defaultProps}
            value={{ time: props.endTime }}
            onChange={(event: any, newValue: TimeOptionType | null)=> props.handleEndTimeChange(event,newValue)}
            id="clear-on-escape"
            clearOnEscape
            renderInput={params => (
              <TextField {...params} margin="normal" />
            )}
          />
        </div>
      </FormControl>
    </div>
  );
}

export interface TimeOptionType {
  time: string;

}


const allDayTime = [
  { time: '12:00 AM' },
  { time: '12:30 AM' },
  { time: '1:00 AM' },
  { time: '1:30 AM' },
  { time: '2:00 AM' },
  { time: '2:30 AM' },
  { time: '3:00 AM' },
  { time: '3:30 AM' },
  { time: '4:00 AM' },
  { time: '4:30 AM' },
  { time: '5:00 AM' },
  { time: '5:30 AM' },
  { time: '6:00 AM' },
  { time: '6:30 AM' },
  { time: '7:00 AM' },
  { time: '7:30 AM' },
  { time: '8:00 AM' },
  { time: '8:30 AM' },
  { time: '9:00 AM' },
  { time: '9:30 AM' },
  { time: '10:00 AM' },
  { time: '10:30 AM' },
  { time: '11:00 AM' },
  { time: '11:30 AM' },
  { time: '12:00 PM' },
  { time: '12:30 PM' },
  { time: '1:00 PM' },
  { time: '1:30 PM' },
  { time: '2:00 PM' },
  { time: '2:30 PM' },
  { time: '3:00 PM' },
  { time: '3:30 PM' },
  { time: '4:00 PM' },
  { time: '4:30 PM' },
  { time: '5:00 PM' },
  { time: '5:30 PM' },
  { time: '6:00 PM' },
  { time: '6:30 PM' },
  { time: '7:00 PM' },
  { time: '7:30 PM' },
  { time: '8:00 PM' },
  { time: '8:30 PM' },
  { time: '9:00 PM' },
  { time: '9:30 PM' },
  { time: '10:00 PM' },
  { time: '10:30 PM' },
  { time: '11:00 PM' },
  { time: '11:30 PM' },
];
