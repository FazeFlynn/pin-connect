console.log('came in app.js');
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

import logger from 'morgan';
// import {router} from './routes/index.js';



// const router = express.Router();
const app = express();

import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : 'sohellofromtheotherside',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 }
  // cookie: { maxAge: 1000 * 60 }
}));

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, './public')));


import userRoutes from './routes/users.routes.js';
import postRoutes from './routes/posts.routes.js';


app.use('/', userRoutes);
app.use('/api/posts', postRoutes);

export {app};

