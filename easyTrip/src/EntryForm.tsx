import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Card, Button, CardHeader, CardBody,
    CardTitle, CardText, Row, Col, Container
} from "reactstrap";

import './EntryForm.scss'
import moment from "moment";
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from 'react-dates';


export function EntryForm() {


    const { handleSubmit, register } = useForm();

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<"startDate" | "endDate" | null>(null);
    const handleDatesChange = ({ startDate, endDate }: { startDate: moment.Moment | null, endDate: moment.Moment | null }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const startDateValue = startDate ? `${startDate.toDate().getFullYear()}-${startDate.toDate().getMonth() + 1}-${startDate.toDate().getDate()}` : ""
    const endDateValue = endDate ? `${endDate.toDate().getFullYear()}-${endDate.toDate().getMonth() + 1}-${endDate.toDate().getDate()}` : ""

    return (
        <Container className="app">
            <Card className="description">
                <CardBody>
                    <CardTitle className="description-header">The new way to plan your next trip</CardTitle>
                    <CardText className="description-text">Create a fully customized day-by-day itinerary for free</CardText>
                </CardBody>
            </Card>
            <Card className="planning-form">
                <CardHeader className="form-header">Itinerary Planner</CardHeader>
                <CardBody>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <input className="city" type="city" name="city" placeholder="Enter destination (Country, Region, City)"
                            ref={register({
                                required: 'Required'
                            })} />
                        <Row>
                            <Col>
                                <DateRangePicker
                                    startDate={startDate}
                                    startDateId="trip-start-date"
                                    endDate={endDate}
                                    endDateId="trip-end-date"
                                    onDatesChange={handleDatesChange}
                                    focusedInput={focusedInput}
                                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                    displayFormat="YYYY-MM-DD"
                                />
                            </Col>
                        </Row>
                        <Row className="btn-header">
                            <Col >
                                <Button className="btn" type="submit">Start Planning</Button>
                            </Col>
                        </Row>
                        <input className="date" type="text" name="startDate" value={123} />
                        <input className="date" type="text" name="endDate" value={endDateValue}/>
                        {/* <input className="city" type="city1" name="city1" placeholder="Enter destination (Country, Region, City)"
                            ref={register({
                                required: 'Required'
                            })} /> */}
                    </form>
                </CardBody>
            </Card>
        </Container>
    )

}