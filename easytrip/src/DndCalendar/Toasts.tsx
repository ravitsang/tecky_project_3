import React, { useState } from 'react';
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';

export function ToastDismissExample() {
    // const { buttonLabel } = props;
    // const [show, setShow] = useState(false);

    // const toggle = () => setShow(!show);

    return (
        <div>
            <Button color="primary">buttonLabel</Button>
            <br />
            <br />
            <Toast isOpen={true}>
                <ToastHeader>Toast title</ToastHeader>
                <ToastBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ToastBody>
            </Toast>
        </div>
    );
}