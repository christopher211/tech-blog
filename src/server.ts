import path from 'path';
import express from 'express';
import session, { CookieOptions } from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import exphbs from 'express-handlebars';
import sequelize from './configs/connection';
import controllers from './controllers';
import helpers from './utils/helpers';

const SequelizeStore = connectSessionSequelize(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const cookie: CookieOptions = {
  maxAge: 300000,
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
};

const sessionOptions = {
  secret: 'Super secret secret',
  cookie,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set up handlebars engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// set session
app.use(session(sessionOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT + '!'));
});
