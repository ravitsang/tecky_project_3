import Knex from 'knex';

const knexConfig = require('./knexfile');
const knex = Knex(knexConfig['testing']);


describe('Test database', () => {

    it("should migrate and rollback successfully", async () => {

        await knex.transaction(async trx => {

            try {
                await trx.migrate.latest();
                await trx.migrate.rollback();
                await trx.migrate.latest();
                await trx.migrate.rollback();

            } catch (e) {
                console.log(e);
            }

        })

    })

    afterAll(async () => {
        await knex.destroy();
    })

})