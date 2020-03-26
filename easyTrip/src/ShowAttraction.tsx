import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { IRootState } from './store';
import { IAttraction } from './attraction/state';
import { IScheduleItem } from './scheduleItem/state';
import { getAllAttractionsThunk } from './attraction/thunks';
import { getAllScheduleItemsThunk, createScheduleItemThunk, deleteScheduleItemThunk } from './scheduleItem/thunks';
import { SimpleMap } from './Map';
import AttractionCard from './AttractionCard';
import './ShowAttraction.scss'
import { FaPlus } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
// import ScheduleCard from './ScheduleCard';


export function ShowAttraction(props:RouteComponentProps<{tripId:string,scheduleItemId:string}>){
    const dispatch = useDispatch();
    
    const attractions = useSelector((state:IRootState)=> state.attraction.attractions,shallowEqual);
    console.log(attractions)
    const isClick = useSelector((state:IRootState)=> state.attraction.isClick);
    const currentTrip = useSelector((state:IRootState)=> 
        state.scheduleItem.scheduleItems.find(scheduleItem=>scheduleItem.tripId === parseInt(props.match.params.tripId)));
    const scheduleItems = currentTrip ? currentTrip : {} ;

    useEffect(()=>{
        dispatch(getAllAttractionsThunk());
        dispatch(getAllScheduleItemsThunk());
    },[dispatch])

    const renderAttractions=(i:number,key:string,attraction:IAttraction,isClick:boolean)=>{
        return <AttractionCard
            attraction={attraction}
            key={key}
            value={"+"}
            attractionOnClick={()=>handleClick(i)}
            isClick={isClick} />
    }

    // const renderScheduleItems=(i:number,key:string,scheduleItem:IScheduleItem)=>{
    //     return <ScheduleCard
    //         scheduleItem={scheduleItem}
    //         key={key}
    //         binOnClick={()=>handleClick(i)} />
    // }

    const handleClick=(i:number)=>{
        isClick ? deleteScheduleItemThunk(parseInt(props.match.params.scheduleItemId)) 
                : createScheduleItemThunk();
    }

    return(
        <div className="container">
            {/* <div className="schedule-area">               
                {scheduleItems.map(scheduleItem=>(
                    <div>
                        {
                            renderScheduleItems(
                                scheduleItem.id,
                                `scheduleItem_${scheduleItem.id}`,
                                scheduleItem
                            )
                        }
                    </div>
                ))}
            </div> */}
            <div className="attraction-area">
                {attractions.map(attraction =>(
                    <div key={`attraction_${attraction.id}`}>
                        {
                            renderAttractions(
                                attraction.id,
                                `$attraction_${attraction.id}`,
                                attraction,
                                false
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}