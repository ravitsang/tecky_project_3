import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('opening_hours',table=>{
        table.increments();
        table.integer('attraction_id').unsigned();
        table.foreign('attraction_id').references('attraction.id');
        table.integer('day_of_week');
        table.time('open_time');
        table.time('close_time');
        table.timestamps(false,true);
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('opening_hours');
}

