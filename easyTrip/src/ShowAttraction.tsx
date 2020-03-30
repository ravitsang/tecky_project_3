import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from './store';
import { IAttraction } from './attraction/state';
import { IScheduleItem } from './scheduleItem/state';
import { getAllAttractionsThunk } from './attraction/thunks';
import SimpleMap from './Map';
import AttractionCard from './AttractionCard';
import './ShowAttraction.scss'
import ScheduleCard, { EmptyScheduleCard } from './ScheduleCard';
import { Col, Row, Container } from 'reactstrap';
import { addAttraction } from './attraction/actions';
import { deleteScheduleItem, createScheduleItem } from './scheduleItem/actions';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

export function ShowAttraction() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const attractions = useSelector((state: IRootState) => state.attraction.attractions);
    const scheduleItems = useSelector((state: IRootState) => state.scheduleItem.scheduleItems);



    useEffect(() => {
        dispatch(getAllAttractionsThunk());
    },[dispatch])

    const renderAttractions = (i: number, key: string, attraction: IAttraction) => {
        return <AttractionCard
            attraction={attraction}
            key={key}
            value={"+"}
            attractionOnClick={() => handleAttractionClick(i)}
        />
    }

    const renderScheduleItems = (i: number, key: string, scheduleItem: IScheduleItem) => {
        return <ScheduleCard
            scheduleItem={scheduleItem}
            key={key}
            binOnClick={() => handleBinClick(i)} />
    }

    const handleAttractionClick = (i: number) => {
        attractions.map(attraction => {
            if (attraction.id === i) {
                // dispatch(addAttraction(attraction.id));
                dispatch(createScheduleItem(attraction));

                const scheduleItemsString = localStorage.getItem('scheduleItems') || "[]";
                const scheduleItems = JSON.parse(scheduleItemsString);

                // const found = scheduleItems.find((scheduleItem:IScheduleItem) => scheduleItem.attractionId === attraction.id)

                // if (!found){
                //     scheduleItems.push({
                //     attractionId: attraction.id,
                //     name: attraction.name
                //     });
                //     localStorage.setItem('scheduleItems',JSON.stringify(scheduleItems));
                // }else{
                //     console.log('Item already exists');
                // }

                scheduleItems.push({
                attractionId: attraction.id,
                name: attraction.name,
                location: attraction.location,
                description: attraction.description,
                image: attraction.attraction_image
                });
                localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));


                // add items to localstorage of external events  for dragging 
                const externalEventsString = localStorage.getItem('externalEvents') || "[]";
                const externalEvents = JSON.parse(externalEventsString);




                externalEvents.push({
                    attractionId: attraction.id,
                    name: attraction.name
                });
                localStorage.setItem('externalEvents', JSON.stringify(externalEvents));

            }
        })


    }

    const handleBinClick = (i: number) => {
        scheduleItems.map(scheduleItem => {
            if (scheduleItem.id === i) {
                dispatch(deleteScheduleItem(scheduleItem.id));
                const scheduleItemsString = localStorage.getItem('scheduleItems') || "[]";
                const newScheduleItems: IScheduleItem[] = JSON.parse(scheduleItemsString);


                newScheduleItems.splice(newScheduleItems.indexOf(scheduleItem), 1)
                localStorage.setItem('scheduleItems', JSON.stringify(newScheduleItems));


                // delete the items from external events list
                const attractionId = scheduleItem.attractionId
                const externalEventsString = localStorage.getItem('externalEvents') || "[]";
                const externalEvents = JSON.parse(externalEventsString);
                const index = externalEvents.findIndex((externalEvent: IScheduleItem) => externalEvent.attractionId === attractionId )

                if (index !== -1) {
                    externalEvents.splice(index,1)
                    localStorage.setItem('externalEvents', JSON.stringify(externalEvents));
                }
            }
        });

    }

    return (
        <div>
            <div className="map-area">
                {/* <SimpleMap /> */}
            </div>
            <Container>
                <Row>
                    <Col className="schedule-area" md="3">
                        <Typography variant="h6" className={classes.title}>
                            Selected Attractions
                        </Typography>
                        {scheduleItems.length === 0 && <EmptyScheduleCard/>}         
                        {scheduleItems.length > 0 && scheduleItems.map(scheduleItem=>(
                            <div key={`scheduleItem_${scheduleItem.id}`}>
                                {
                                    renderScheduleItems(
                                        scheduleItem.id,
                                        `scheduleItem_${scheduleItem.id}`,
                                        scheduleItem
                                    )
                                }
                            </div>
                        ))}
                    </Col>
                    <Col className="attraction-area" md="9">
                        {attractions.map(attraction => (
                            <div key={`attraction_${attraction.id}`}>
                                {
                                    renderAttractions(
                                        attraction.id,
                                        `$attraction_${attraction.id}`,
                                        attraction
                                    )
                                }
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}