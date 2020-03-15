import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Card, CardHeader, CardBody,
    CardTitle, CardText, Row, Col, Container
} from "reactstrap";
import moment from "moment";
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from 'react-dates';
// import Select from 'react-select'
import { Button, Card as MaterialUICard, makeStyles, createStyles, Theme } from '@material-ui/core';
import './EntryForm.scss'

import Responsive from "react-responsive";
import { ReactSelect } from "./ReactSelect";


export function EntryForm() {

    // react-dates setting
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<"startDate" | "endDate" | null>(null);
    const handleDatesChange = ({ startDate, endDate }: { startDate: moment.Moment | null, endDate: moment.Moment | null }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };


    let startDateValue = startDate ? `${startDate.toDate().getFullYear()}-${startDate.toDate().getMonth() + 1}-${startDate.toDate().getDate()}` : ""
    let endDateValue = endDate ? `${endDate.toDate().getFullYear()}-${endDate.toDate().getMonth() + 1}-${endDate.toDate().getDate()}` : ""


    const { handleSubmit, register, setValue } = useForm();

    // set up a custom register using the useEffect Hook and update the value via setValue.
    setValue("trip-start-date", startDateValue)
    setValue("trip-end-date", endDateValue)


    useEffect(() => {
        register({ name: "city" }, { required: true }); // custom register antd input
        register({ name: "trip-start-date" }, { required: true }); // custom register react-select 
        register({ name: "trip-end-date" }, { required: true }); // custom register antd input
    }, [register])

    const onSubmit = (values: any) => {
        console.log(values);
        const tripDetailString = localStorage.getItem("tripDetail") || "{}"
        let tripDetail = JSON.parse(tripDetailString);
        tripDetail = {
            city: values.city.value,
            startDate: values['trip-start-date'],
            endDate: values['trip-end-date']
        }
        localStorage.setItem("tripDetail", JSON.stringify(tripDetail));
    }

    // react-select setting
    const [values, setReactSelectValue] = useState({ selectedOption: [] });

    const handleSignleChange = (selectedOption: any) => {
        setValue("city", selectedOption);
        setReactSelectValue({ selectedOption });
        console.log(selectedOption);
    }

    // console.log({ startDateValue: startDateValue });
    // console.log({ endDateValue: endDateValue });


    //material ui setting
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                maxWidth: 345,
                color: '#212121'
            },
            submit: {
                // backgroundColor: '#9e9e9e'
                // padding:20
            }
        }),
    );

    const classes = useStyles();

    return (
        <Container className="app">
            <Card className="description">
                <CardBody>
                    <CardTitle className="description-header">The new way to plan your next trip</CardTitle>
                    <CardText className="description-text">Create a fully customized day-by-day itinerary for free</CardText>
                </CardBody>
            </Card>
            <div className="planning-form" >
                <MaterialUICard className={classes.root}>
                    <CardHeader className="form-header">Itinerary Planner</CardHeader>
                    <CardBody>
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <ReactSelect 
                                value={values.selectedOption}
                                handleSingleChange={handleSignleChange}/>
                            <Row>
                                <Col className="date-picker">
                                    <Responsive
                                        maxWidth={767}>
                                        <DateRangePicker
                                            startDate={startDate}
                                            startDateId="trip-start-date"
                                            endDate={endDate}
                                            endDateId="trip-end-date"
                                            onDatesChange={handleDatesChange}
                                            focusedInput={focusedInput}
                                            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                            displayFormat="ddd MM/DD"
                                            withPortal={true}
                                            numberOfMonths={1}
                                            required
                                        />
                                    </Responsive>
                                    <Responsive
                                        minWidth={768}>
                                        <DateRangePicker
                                            startDate={startDate}
                                            startDateId="trip-start-date"
                                            endDate={endDate}
                                            endDateId="trip-end-date"
                                            onDatesChange={handleDatesChange}
                                            focusedInput={focusedInput}
                                            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                            displayFormat="ddd MM/DD"
                                            withPortal={true}
                                            required
                                        />
                                    </Responsive>
                                </Col>
                            </Row>
                            <Row className="btn-header">
                                <Col className="btn">
                                    <Button className={classes.submit} variant="contained" size="large" type="submit">Start Planning</Button>
                                </Col>
                            </Row>
                        </form>
                    </CardBody>
                </MaterialUICard>
            </div>
        </Container>
    )

}