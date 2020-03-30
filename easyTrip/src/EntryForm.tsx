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

import { Button, Card as MaterialUICard, makeStyles, createStyles, Theme } from '@material-ui/core';
import './EntryForm.scss'
import Responsive from "react-responsive";
import { ReactSelect } from "./ReactSelect";
import Alert from '@material-ui/lab/Alert';

import { IDaysInfor } from "./trip/state";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";


export function EntryForm() {

    // react-dates setting
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<"startDate" | "endDate" | null>(null);
    const handleDatesChange = ({ startDate, endDate }: { startDate: moment.Moment | null, endDate: moment.Moment | null }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const dispatch = useDispatch()
    const { handleSubmit, register, setValue, errors } = useForm();

    if (startDate) {
        const startDateValue = moment(startDate).format('llll');
        const splitStartDate = startDateValue.split(' ')//.slice(0,4).join('')
        const days = splitStartDate[0].split(',')[0]
        const textMonth = splitStartDate[1]
        const day = splitStartDate[2].split(',')[0]
        const year = splitStartDate[3]
        const month = moment(startDate).format('l').split('/')[0];

        setValue("trip-start-date", {
            days: days,
            textMonth: textMonth,
            month: month,
            day: day,
            year: year
        })
    }

    if (endDate) {
        const endDateValue = moment(endDate).format('LLLL');
        const splitendDate = endDateValue.split(' ')//.slice(0,4).join('')
        const days = splitendDate[0].split(',')[0]
        const textMonth = splitendDate[1]
        const day = splitendDate[2].split(',')[0]
        const year = splitendDate[3]
        const month = moment(endDate).format('l').split('/')[0];


        setValue("trip-end-date", {
            days: days,
            textMonth: textMonth,
            month: month,
            day: day,
            year: year
        })

    }

    const calTripDuration = (values: any) => {

        let numberOfDays = 0;
        let isOverAMonth = true
        let dateInfor: IDaysInfor[] = []

        let startMonthDays = []
        let endMonthDays = []

        const city = values.city.value;
        const startDate = values['trip-start-date']
        const endDate = values['trip-end-date']

        const daysOfAMonth = new Date(parseInt(startDate.year), parseInt(startDate.month), 0).getDate()

        // calculate num of days of the trip
        if (parseInt(endDate.day) - parseInt(startDate.day) > 0) {
            isOverAMonth = false
            numberOfDays = parseInt(endDate.day) - parseInt(startDate.day) + 1
        } else {
            numberOfDays = daysOfAMonth - parseInt(startDate.day) + (parseInt(endDate.day)) + 1
        }

        for (let i = 0; i < numberOfDays; i++) {
            // within a month case
            if (!isOverAMonth || daysOfAMonth - (parseInt(startDate.day) + i) > -1) {
                startMonthDays.push(parseInt(startDate.day) + i)
            } else {
                // over a month case
                endMonthDays.push(parseInt(startDate.day) + i - daysOfAMonth)
            }

        }
        console.log(startDate);
        console.log(endDate);
        // let startMonth = startDate.month
        // let endMonth = endDate.month
        // const lastDayIndex = endMonthDays.length - 1;
        // let endDay = endMonthDays[lastDayIndex]


        const startDateString = `${startDate.year}-${startDate.month.length < 2 ? 0 + startDate.month : startDate.month}-${startDate.day.length < 2 ? 0 + startDate.day : startDate.day}`
        const endDateString = `${endDate.year}-${endDate.month.length < 2 ? 0 + endDate.month : endDate.month}-${endDate.day.length < 2 ? 0 + endDate.day : endDate.day}`

        console.log(startDateString);
        console.log(endDateString);

        dateInfor.push({
            startDate: startDateString,
            year: startDate.year,
            month: [startDate.textMonth, startDate.month],
            days: startMonthDays
        })

        console.log(endDate);
        dateInfor.push({
            endDate: endDateString,
            year: endDate.year,
            month: [endDate.textMonth, endDate.month],
            days: endMonthDays
        })

        const tripSchedule = {
            city: city,
            dateInfor: dateInfor,
            tripDays: numberOfDays
        }
        localStorage.setItem("tripSchedule", JSON.stringify(tripSchedule));
        window.location.href = "/attraction";
    }




    // set up a custom register using the useEffect Hook and update the value via setValue.


    useEffect(() => {
        register({ name: "city" }, { required: true }); // custom register antd input
        register({ name: "trip-start-date" }, { required: true }); // custom register react-select 
        register({ name: "trip-end-date" }, { required: true }); // custom register antd input
    }, [register])

    const onSubmit = (values: any) => {
        console.log(values);
        calTripDuration(values)
        // dispatch(push('/calendar'))

    }

    // react-select setting
    const [values, setReactSelectValue] = useState({ selectedOption: [] });

    const handleSignleChange = (selectedOption: any) => {
        setValue("city", selectedOption);
        setReactSelectValue({ selectedOption });
        console.log(selectedOption);
    }


    //material ui setting
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                maxWidth: 345,
                color: '#212121'
            },
            alert: {
                marginTop: -40,
                marginLeft: 25,
                marginBottom: 10,
                paddingTop: 0,
                paddingBottom: 0
            },
            submit: {
                borderRadius: 100,
                backgroundColor: "#f2f2f2",
                textTransform: "none"
            }
        }),
    );

    const classes = useStyles();

    return (

        <div className="app">
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
                                handleSingleChange={handleSignleChange} />
                            <Row>
                                {errors.city && <Alert className={classes.alert} severity="error">Destination is required</Alert>}
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
        </div>
    )

}