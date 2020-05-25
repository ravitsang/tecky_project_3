import { ThunkDispatch } from "../store";
import { loginFailed, login, logout } from "./actions";

const REACT_APP_API_SERVER = process.env

export function loginThunk(username: string, password: string) {

    return async (dispatch: ThunkDispatch) => {
        console.log(username);
        console.log(password);
        const res = await fetch(`${REACT_APP_API_SERVER}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await res.json();
        console.log(result);
        
        if (res.status === 200) {
            localStorage.setItem('token', result.token);
            console.log("success");
            dispatch(login())
        } else {
            console.log("failed");
            dispatch(loginFailed(result.msg))
        }
    }
}


export function logoutThunk() {
    return async (dispatch: ThunkDispatch) => {
        localStorage.removeItem('token');
        dispatch(logout())
    }
}