import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography, Popover, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { addEvent } from '../trip/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AddEventForm } from './AddEventForm';
// import { IRootState } from '../store';
// import { EventSnackbar } from './SnackBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: "column",
            paddingTop: 0,
            paddingBottom: 20,
            paddingLeft: 0,
            paddingRight: 0
        },
        createButton: {
            textTransform: "none",
            width: 277,
            height: 50,
            fontSize: 14
        },
        title: {
            width: 277,
            height: 50,
            textTransform: "none",
            fontSize: 18,
            paddingTop: 0
        },
        closePostion: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        closeButton: {

        },
        label: {
            fontColor: "#424242"
        }
    }),
);

export interface IAddEventPopover {
    isShowing: boolean
    hide: () => void
    isShowingForm: () => void
    mouseEvent: any
    eventInfo: any
}


export function AddEventPopover(props: IAddEventPopover) {
    const classes = useStyles();

    // const dispatch = useDispatch();

    const [isShowingForm, setIsShowingForm] = useState(false)
    const [isHidePopover, setIsHidePopover] = useState(null)


    function toggleForm() {
        setIsShowingForm(!isShowingForm)
    }

    // function togglePopover() {
    //     setIsHidePopover(null)
    // }


    const handleOnClick = () => {
        // dispatch(addEvent(props.eventInfo))
        props.isShowingForm()
        // setIsHidePopover(true)
        props.hide()
    }

    console.log(props.mouseEvent);

    return (
        <div>
            {/* {
                isShowingForm &&
                <AddEventForm
                    isShowing={isShowingForm}
                    hide={toggleForm}
                    eventInfo={props.eventInfo} />
            } */}
            <Popover
                // id={id}
                open={props.isShowing}
                anchorReference="anchorPosition"
                anchorPosition={{ top: props.mouseEvent.clientY , left: props.mouseEvent.clientX }}
                onClose={()=>props.hide()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <div className={classes.closePostion}>
                        <IconButton className={classes.closeButton}
                            classes={{ label: 'Mui-disabled' }} size="medium" aria-label="close" color="inherit" onClick={props.hide}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                    {/* <Button disabled className={classes.title}>Add activities</Button> */}
                    <Button onClick={handleOnClick} className={classes.createButton}>Add custom event</Button>
                </Typography>
            </Popover>
        </div>
    );
}