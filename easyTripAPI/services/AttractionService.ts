import Knex from "knex";
import { Attraction } from '../services/models';

export class AttractionService{
    constructor(private knex:Knex){

    }

    async getAllAttraction(){
        const attractions:Attraction[] = await this.knex.raw(`
        SELECT "attraction".id, "city".name as city_name,"attraction".name, description, location ,telephone, "attraction".url, "attraction_image".url as attraction_image FROM "attraction" 
            JOIN "attraction_image" ON "attraction_image".id = "attraction".attraction_image_id
            JOIN "city" ON "city".id = "attraction".city_id`)
        return attractions;
    }

    async getFilteredAttraction(tagId:number){
        const filteredAttractions:Attraction[] = await this.knex.raw(`
        SELECT "attraction".id,"city".name as city_name,"tag".name as tag_name,"attraction".name as attraction_name, description, location ,telephone, "attraction".url, "attraction_image".url as attraction_image FROM "attraction" 
            JOIN "attraction_image" ON "attraction_image".id = "attraction".attraction_image_id
            JOIN "city" ON "city".id = "attraction".city_id
            JOIN "attraction_tag" ON "attraction_tag".attraction_id = "attraction".id
            JOIN "tag" ON "attraction_tag".tag_id = "tag".id
            WHERE "tag".id = tag_id`,{
                tag_id: tagId
            }
        )
        return filteredAttractions;
    }

    async createScheduleItem(tripId:number,attractionId:number){
        const newScheduleItem = await this.knex.raw(`
        INSERT INTO "schedule_item" (
            "trip_id",
            "attraction_id",
            "type"
        ) VALUES (
            :trip_id,
            :attraction_id,
            :type
        ) RETURNING id`,{
            trip_id: tripId,
            attraction_id: attractionId,
            type: "attraction"
        })
        return newScheduleItem.rows[0].id;
    }

    async deleteScheduleItem(scheduleItemId:number){
        const deletedScheduleItem = await this.knex.raw(`
        DELETE FROM "schedule_item"
        WHERE id = :id`,{
            id: scheduleItemId
        })
        return deletedScheduleItem;
    }

    async isTagIdExist(tagId:number){
        const result = await this.knex.raw(`
        SELECT id FROM "tag"
        WHERE id = :id`,
        {
            id: tagId
        });

        if (result.rows.length === 0){
            return false;
        }else{
            return true;
        }
    }

    async isTripIdExist(tripId:number){
        const result = await this.knex.raw(`
        SELECT id FROM "trip"
        WHERE id = :id`,
        {
            id: tripId
        });

        if (result.rows.length === 0){
            return false;
        }else{
            return true;
        }
    }

    async isAttractionIdExist(attractionId:number){
        const result = await this.knex.raw(`
        SELECT id FROM "attraction"
        WHERE id = :id`,
        {
            id: attractionId
        });

        if (result.rows.length === 0){
            return false;
        }else{
            return true;
        }
    }

    async isScheduleItemIdExist(scheduleItemId:number){
        const result = await this.knex.raw(`
        SELECT id FROM "schedule_item"
        WHERE id = :id`,
        {
            id: scheduleItemId
        });

        if (result.rows.length === 0){
            return false;
        }else{
            return true;
        }
    }
}