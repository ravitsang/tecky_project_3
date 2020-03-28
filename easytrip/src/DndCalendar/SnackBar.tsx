import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface State extends SnackbarOrigin {
    open: boolean;
}

export interface IAddEventSnackbar {
    message: string
    isShowing: boolean
    hide: () => void
}

const vertical = 'bottom'
const horizontal = 'right'

console.log('snackbar');

export function EventSnackbar(props: IAddEventSnackbar) {

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={props.isShowing}
                onClose={props.hide}
                message={props.message}
            />
        </div>
    );
}