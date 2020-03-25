import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Knex from 'knex';
import { AttractionService } from './services/AttractionService';
import { AttractionRouter } from './routers/AttractionRouter';
import { ScheduleItemService } from './services/ScheduleItemService';
import { ScheduleItemRouter } from './routers/ScheduleItemRouter';


const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])

const app = express();
app.use(bodyParser.json());
app.use(cors());

const attractionService = new AttractionService(knex);
const attractionRouter = new AttractionRouter(attractionService);
const scheduleItemService = new ScheduleItemService(knex);
const scheduleItemRouter = new ScheduleItemRouter(scheduleItemService);

app.use('/attraction',attractionRouter.router());
app.use('/schedule',scheduleItemRouter.router());


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})