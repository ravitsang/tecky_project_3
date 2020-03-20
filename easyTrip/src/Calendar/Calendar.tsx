import React, { useState, useCallback } from 'react'
// import './styles.scss';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import Card from './Card';
// import Table from './Table';
import { CalendarTable } from './CalendarTable';
import { DaysBar } from '../DaysBar';
import { Card as MaterialCard, CardContent, makeStyles, createStyles, Theme } from '@material-ui/core';
import { TabBar } from '../TabBar';
import './Calendar.scss'

export default function Calendar() {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Ocean Park',
            },
            {
                id: 2,
                text: 'Nan Lian Garden',
            },
            {
                id: 3,
                text: 'Hong Kong Museum of History',
            },
            {
                id: 4,
                text: 'Hong Kong Museum of Medical Sciences',
            },
            {
                id: 5,
                text:
                    'Latau Island',
            },
            {
                id: 6,
                text: 'Hong Kong Railway Museum',
            },
            {
                id: 7,
                text: 'Tian Tan Buddha (Big Buddha)',
            },
        ])

        const moveCard = useCallback(
            (dragIndex: number, hoverIndex: number) => {
                const dragCard = cards[dragIndex]
                setCards(
                    update(cards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, dragCard],
                        ],
                    }),
                )
            },
            [cards],
        )

        const renderCard = (card: { id: number; text: string }, index: number) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.text}
                    moveCard={moveCard}
                />
            )
        }

        const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root:{
                marginLeft: 30,
                marginRight:100,
                borderRadius: 0
            },
            calendar: {
                paddingTop: 50,
                paddingLeft: 30,
                paddingRight: 0,
                borderRadius: 0
                
            }
        }),
    );

    const classes = useStyles();

        return (
            <div>
                {/* <div className='title'>Calendar</div>
                <div className='destination'>Hong Kong</div>
                <div className='main'>
                    <div className='row'>
                        <div className='col-3 unplanned'>
                            <div className='unplanned-title'>Unplanned Attraction</div>
                            <div className='unplanned-table'>
                                <DndProvider backend={Backend}>
                                    {cards.map((card, i) => renderCard(card, i))}
                                </DndProvider>
                            </div>
                        </div>
                        <div className='col-1 time'>
                            <li className='time-item'>8am</li>
                            <li className='time-item'>9am</li>
                            <li className='time-item'>10am</li>
                            <li className='time-item'>11am</li>
                            <li className='time-item'>12pm</li>
                            <li className='time-item'>1pm</li>
                            <li className='time-item'>2pm</li>
                            <li className='time-item'>3pm</li>
                            <li className='time-item'>4pm</li>
                            <li className='time-item'>5pm</li>
                            <li className='time-item'>6pm</li>
                            <li className='time-item'>7pm</li>
                            <li className='time-item'>8pm</li>
                        </div>
                        <div className='col-8 planning'>
                            <div className='table'>
                                <div className='table-row'>
                                    <div className='table-title'>MON, MAR 02</div>
                                    <div className='table-schedule'>
                                        <DndProvider backend={Backend}>
                                            <Table allowedDropEffect="move"  />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                        </DndProvider>
                                    </div>
                                </div>
                                <div className='table-row'>
                                    <div className='table-title'>MON, MAR 03</div>
                                    <div className='table-schedule'>
                                        <DndProvider backend={Backend}>
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                            <Table allowedDropEffect="move" />
                                        </DndProvider>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> */}
                <TabBar/>
                <div className="page">
                    <DaysBar />
                    <MaterialCard className={classes.root}>
                        <CardContent className={classes.calendar}>
                            <CalendarTable />
                        </CardContent>
                    </MaterialCard>
                </div>
            </div>
        )
    }
}
