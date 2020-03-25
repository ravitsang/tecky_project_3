import express from 'express';
import { Request,Response } from 'express';
import { ScheduleItemService } from '../services/ScheduleItemService';

export class ScheduleItemRouter{
    constructor(private scheduleItemService:ScheduleItemService){

    }

    router(){
        const router = express.Router();
        router.get('/',this.getScheduleItems);
        router.post('/',this.createScheduleItem);
        router.delete('/:scheduleItemId',this.deleteScheduleItem);
        return router;
    }

    getScheduleItems = async(req:Request,res:Response)=>{
        try{
            const getScheduleItems = await this.scheduleItemService.getScheduleItems();
            res.json({ success:true, data:getScheduleItems });
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }

    createScheduleItem = async(req:Request,res:Response)=>{
        try{
            const tripId = parseInt(req.params.tripId);
            const attractionId = parseInt(req.params.attractionId);

            const isTripIdExist = await this.scheduleItemService.isTripIdExist(tripId);
            if(isNaN(tripId) || !isTripIdExist){
                res.status(400).json({msg:"Invalid Trip ID"});
                return;
            };
            const isAttractionIdExist = await this.scheduleItemService.isAttractionIdExist(attractionId);
            if(isNaN(attractionId) || !isAttractionIdExist){
                res.status(400).json({msg:"Invalid Attraction ID"});
                return;
            };

            const id = await this.scheduleItemService.createScheduleItem(tripId,attractionId);
            res.json({ success:true, data:{id} });
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }

    deleteScheduleItem = async(req:Request,res:Response)=>{
        try{
            const scheduleItemId = parseInt(req.params.scheduleItemId);
            
            const isScheduleItemIdExist = await this.scheduleItemService.isScheduleItemIdExist(scheduleItemId);
            if(isNaN(scheduleItemId) || !isScheduleItemIdExist){
                res.status(400).json({msg:"Invalid Schedule Item ID"});
                return;
            };
            
            res.json({success:true})
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }
}