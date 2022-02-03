const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
const routes = require('./routes');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
// cors to be used only in development or testing
if (!isProduction) {
	app.use(cors());
}
// helmet set a variety of headers for improved security of the app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: 'cross-origin',
	})
);
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && 'lax',
			httpOnly: true,
		},
	})
);

app.use(routes);

module.exports = app;
