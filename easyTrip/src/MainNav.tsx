import React from 'react';
import './MainNav.scss';

import {
    Navbar,
    Input
} from 'reactstrap';
import { Link } from 'react-router-dom';


export interface INavbarProps {


}

export function MainNav(props: INavbarProps) {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="mynav">
            <Navbar className="mynavbar" color="dark">
                <h3>
                    <Link to="/">EasyTrip</Link>
                </h3>
                <Input className="search-bar" type="search" placeholder="search"></Input>
                <Link to="/login" className="login" >Login</Link>
            </Navbar>
        </div>
    );
}