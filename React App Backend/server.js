const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');/* chrome has to know it's a safe thing */
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})

/*
--> res = this is working
/signin --> post = succes/fail
/register -->post = user
/profile/:userId --> GET=user
/image --> PUT --> updated user
*/