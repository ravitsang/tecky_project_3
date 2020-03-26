import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface State extends SnackbarOrigin {
    open: boolean;
}

export interface IAddEventSnackbar {
    open: boolean
}



export function AddEventSnackbar() {
    const [state, setState] = React.useState<State>({
        open: true,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;

    // const handleClick = (newState: SnackbarOrigin) => () => {
    //     setState({ open: true, ...newState });
    // };



    const handleClose = () => {
        setState({ ...state, open: false });
    };


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                message="Event was deleted"
            />
        </div>
    );
}