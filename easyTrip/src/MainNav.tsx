import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Theme, makeStyles, createStyles, InputBase, fade } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Responsive from "react-responsive";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './MainNav.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#424242',
            main: '#212121'
        }
    },
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: '#FFFFFF'
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            marginRight: 20,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            }
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
        rightToolbar: {
            marginLeft: 'auto'
        },
        appBar: {
            display: 'flex',
            justifyContent: 'center'
        },
        toolBar:{
            minHeight: 50,
        }
    }),
);

export function MainNav() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar className={classes.toolBar}>
                        <Responsive maxWidth={599}>
                            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                        </Responsive>
                        <Typography variant="h6" className={classes.title}>
                            <Link className="logo" to="/">EasyTrip</Link>
                        </Typography>
                        <Responsive minWidth={768}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>

                        </Responsive>
                        <Responsive maxWidth={767} >
                            <section>
                                <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                            </section>
                            <section className={classes.rightToolbar}>
                                <IconButton aria-label="search" color="inherit">
                                    <SearchIcon />
                                </IconButton>
                                <Button ><Link className="login-btn" to="/login">Login</Link></Button>
                            </section>
                        </Responsive>
                        <Button color="inherit"><Link to="/login"></Link> Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}