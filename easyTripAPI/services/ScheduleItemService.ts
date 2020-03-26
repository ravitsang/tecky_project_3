import Knex from "knex";

export class ScheduleItemService{
    constructor(private knex:Knex){

    }

    async getScheduleItems(){
        const scheduleItems = await this.knex.raw(`
        SELECT "schedule_item".id, "attraction".name as attraction_name,type FROM "schedule_item" 
            JOIN "trip" ON "trip".id = "schedule_item".trip_id
            JOIN "attraction" ON "attraction".id = "schedule_item".attraction_id`)
        return scheduleItems.rows;
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