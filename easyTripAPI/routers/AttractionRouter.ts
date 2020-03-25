import express from 'express';
import { Request,Response } from 'express';
import { AttractionService } from '../services/AttractionService';

export class AttractionRouter{
    constructor(private attractionService:AttractionService){

    }

    router(){
        const router = express.Router();
        router.get('/',this.getAllAttractions);
        router.get('/:tagId',this.getFilteredAttraction);
        return router;
    }

    getAllAttractions = async(req:Request,res:Response)=>{
        try{
            const getAllAttractions = await this.attractionService.getAllAttractions();
            res.json({ success:true, data:getAllAttractions });
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }

    getFilteredAttraction = async(req:Request,res:Response)=>{
        try{
            const tagId = parseInt(req.params.tagId);

            const isTagIdExist = await this.attractionService.isTagIdExist(tagId);
            if(isNaN(tagId) || !isTagIdExist){
                res.status(400).json({msg:"Invalid Tag ID"});
                return;
            }

            const filteredAttraction = await this.attractionService.getFilteredAttraction(tagId);
            res.json({ success:true, data:filteredAttraction });
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }
}