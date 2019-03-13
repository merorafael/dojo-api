import express from "express";
import cors from "cors";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import planetsRouter from "./routes/planets";
import dbConnection from "./database/connect";

const swaggerDocument = require('./swagger.json');
const server = express();

dbConnection();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(logger('dev'));

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/planet', planetsRouter);

server.listen("8080", () => {
    console.info('Server started - ', "8080");
});
