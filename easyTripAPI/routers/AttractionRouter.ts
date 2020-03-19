import express from 'express';
import { Request,Response } from 'express';
import { AttractionService } from '../services/AttractionService';

export class AttractionRouter{
    constructor(private attractionService:AttractionService){

    }

    router(){
        const router = express.Router();
        router.get('/',this.getAllAttraction);
        router.get('/:tagId',this.getFilteredAttraction);
        router.post('/:tripId/:attractionId',this.createScheduleItem);
        router.delete('/:scheduleItemId',this.deleteScheduleItem);
        return router;
    }

    getAllAttraction = async(req:Request,res:Response)=>{
        try{
            res.json(await this.attractionService.getAllAttraction());
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }

    getFilteredAttraction = async(req:Request,res:Response)=>{
        try{
            const tagId = parseInt(req.params.tagId);

            const isTagIdExist = await this.attractionService.isTagIdExist(tagId);
            if(!isTagIdExist){
                res.status(400).json({msg:"Invalid Tag ID"});
                return;
            }

            res.json(await this.attractionService.getFilteredAttraction(tagId));
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }
    
    createScheduleItem = async(req:Request,res:Response)=>{
        try{
            const tripId = parseInt(req.params.tripId);
            const attractionId = parseInt(req.params.attractionId);

            const isTripIdExist = await this.attractionService.isTripIdExist(tripId);
            if(!isTripIdExist){
                res.status(400).json({msg:"Invalid Trip ID"});
                return;
            };
            const isAttractionIdExist = await this.attractionService.isAttractionIdExist(attractionId);
            if(!isAttractionIdExist){
                res.status(400).json({msg:"Invalid Attraction ID"});
                return;
            };

            const id = await this.attractionService.createScheduleItem(tripId,attractionId);
            res.json({schedule_item_id:id});
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }

    deleteScheduleItem = async(req:Request,res:Response)=>{
        try{
            const scheduleItemId = parseInt(req.params.scheduleItemId);
            
            const isScheduleItemIdExist = await this.attractionService.isScheduleItemIdExist(scheduleItemId);
            if(!isScheduleItemIdExist){
                res.status(400).json({msg:"Invalid Schedule Item ID"});
                return;
            };
            
            res.json({success:true})
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }
}