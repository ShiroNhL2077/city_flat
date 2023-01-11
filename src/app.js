import express from 'express';
import cors from 'cors';
import { notFoundError, errorHandler } from './middlewares/error_handler.js';
import { handleSockets } from './utils/database/socket.handler.js';
import Passport from './middlewares/passport.js';
import passport from "passport";
;

import morgan from 'morgan';
/* Imports from project modules */

import { userRouter } from './routes/user.routes.js';
import { appartmentRouter } from './routes/appartment.routes.js';


/* Creating express app */
const app = express();





app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));

app.use(morgan('dev'));
Passport();



/* Handling different sockets */
handleSockets();

/* Using routers */
app.use('/user', userRouter);
app.use('/appartments',appartmentRouter);
// PASSPORT MIDDLEWARE 
app.use(passport.initialize());
app.use(passport.session());


/** Error handlers */
app.use(notFoundError);
app.use(errorHandler);


export default app;