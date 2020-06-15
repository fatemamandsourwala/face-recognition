const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'fatemamandsourwala',
		password: '',
		database: 'smart-brain',
	},
});

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) =>
	register.handleRegister(req, res, db, bcrypt)
);
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageapi', (req, res) => image.handleImageApi(req, res));

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT || 3000}`);
});
