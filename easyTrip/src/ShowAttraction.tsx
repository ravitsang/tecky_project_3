import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'immutable';
import { IRootState } from './store';
import { IAttraction } from './attraction/state';
import { getAllAttractionsThunk } from './attraction/thunks';
import { getAllScheduleItemsThunk, createScheduleItemThunk, deleteScheduleItemThunk } from './scheduleItem/thunks';
import { SimpleMap } from './Map';
import MediaCard from './AttractionCard';
import './ShowAttraction.scss'
import { IconType } from 'react-icons/lib/cjs';
import { FaPlus } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

export interface IShowAttractionProps extends RouteComponentProps<{scheduleItemId:string}>{
    attractions: IAttraction[]
    buttons: List<string>
    isClick: boolean
    getAllAttractions: ()=>void
    getAllScheduleItems: ()=>void
    createScheduleItem: (scheduleItemId:number)=>void
    deleteScheduleItem: (scheduleItemId:number)=>void
}

export function ShowAttraction(props:RouteComponentProps<{scheduleItemId:string}>){
    // find current tripId
    // const currentTrip = useSelector((state:IRootState)=> 
    //     state.scheduleItem.scheduleItems.find(scheduleItem=>{scheduleItem.tripId === props.match.params.tripId}))
    const dispatch = useDispatch();

    const attractions = useSelector((state:IRootState)=> state.attraction.attractions);
    const isClick = useSelector((state:IRootState)=> state.attraction.isClick);
    const scheduleItems = useSelector((state:IRootState)=> state.scheduleItem.scheduleItems);

    useEffect(()=>{
        dispatch(getAllAttractionsThunk());
        dispatch(getAllScheduleItemsThunk());
    },[dispatch])

    const renderAttractions=(i:number,key:string,attractions:IAttraction[],isClick:boolean)=>{
        return <MediaCard
            attractions={attractions}
            key={key}
            value={"+"}
            attractionOnClick={()=>handleClick(i)}
            isClick={isClick} />
    }

    const handleClick=(i:number)=>{
        isClick ? deleteScheduleItemThunk(parseInt(props.match.params.scheduleItemId)) 
                : createScheduleItemThunk();
    }

    return(
        <div className="container">
            <div className="attraction-area">
                {attractions.map(attraction =>(
                    <div className="attraction-row" key={`attraction_${attraction.id}`}>
                        {
                            renderAttractions(
                                attraction.id,
                                `$attraction_${attraction.id}`,attraction,false
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}