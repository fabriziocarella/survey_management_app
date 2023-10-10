require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/mongodb');
const app = express();

// Settings
app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));

// Routes
app.use(require('./routes/users'));
app.use(require('./routes/surveys'));

// Iniciando el servidor
app.listen(app.get('port'), () => {
    connectToDatabase()
    console.log(`Server work in port: ---> ${app.get('port')}`);
});