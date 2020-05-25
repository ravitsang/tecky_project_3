import React, { useState, FormEvent } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { loginThunk } from './auth/thunks';
import { useDispatch } from 'react-redux';



export function Login() {


    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginThunk(username,password))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(event)=>setUsername(event.target.value)} />
                {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}