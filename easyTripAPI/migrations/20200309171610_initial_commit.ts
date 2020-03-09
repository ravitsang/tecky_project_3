import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable("user",table =>{
        table.increments()
        table.string("name")
        table.string("username").unique()
        table.string("email").unique()
        table.string("password")
        table.timestamps(false,true)
    })

    await knex.schema.createTable("tag",table =>{
        table.increments()
        table.string("name").unique()
        table.timestamps(false,true)

    })

    await knex.schema.createTable("attraction_image",table =>{
        table.increments()
        table.string("url").unique()
        table.timestamps(false,true)

    })
    await knex.schema.createTable("city",table =>{
        table.increments()
        table.string("name").unique()
        table.timestamps(false,true)

    })
    await knex.schema.createTable("trip",table =>{
        table.increments()
        table.integer("user_id").unsigned()
        table.foreign("user_id").references("user.id")
        table.string("name").notNullable()
        table.date("start_date").notNullable()
        table.date("end_date").notNullable()
        table.timestamps(false,true)
    })
    await knex.schema.createTable("stay",table =>{
        table.increments()
        table.integer("trip_id").unsigned()
        table.foreign("trip_id").references("trip.id")
        table.string("name").notNullable()
        table.string("location").notNullable()
        table.string("start_time")
        table.string("end_time")
        table.timestamps(false,true)
    })

    await knex.schema.createTable("attraction",table =>{
        table.increments()
        table.integer("attraction_image_id").unsigned()
        table.foreign("attraction_image_id").references("attraction_image.id")
        table.integer("city_id").unsigned()
        table.foreign("city_id").references("city.id")
        table.string("name")
        table.text("description")
        table.string("location")
        table.string("telephone")
        table.string("url")
        table.timestamps(false,true)
    })

    await knex.schema.createTable("attraction_tag",table =>{
        table.increments()
        table.integer("attraction_id").unsigned()
        table.foreign("attraction_id").references("attraction.id")
        table.integer("tag_id").unsigned()
        table.foreign("tag_id").references("tag.id")
        table.timestamps(false,true)
    })

    await knex.schema.createTable("schedule_item",table =>{
        table.increments()
        table.integer("trip_id").unsigned()
        table.foreign("trip_id").references("trip.id")
        table.integer("attraction_id").unsigned()
        table.foreign("attraction_id").references("attraction.id")
        table.string("name")
        table.text("description")
        table.string("location")
        table.string("start_time")
        table.string("end_time")
        table.string("type")
        table.timestamps(false,true)
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable("schedule_item")
    await knex.schema.dropTable("attraction_tag")
    await knex.schema.dropTable("attraction")
    await knex.schema.dropTable("stay")
    await knex.schema.dropTable("trip")
    await knex.schema.dropTable("city")
    await knex.schema.dropTable("attraction_image")
    await knex.schema.dropTable("tag")
    await knex.schema.dropTable("user")
}

