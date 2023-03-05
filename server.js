const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGO_URL)
    .then((res) => console.log(successMsg('Connect to DB')))
    .catch((error) => console.log(errorMsg(error)))

app.listen(process.env.PORT, (err) => {
    err ? console.log(errorMsg(err)) : console.log(successMsg('listening port 3000'))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
    const title = 'Error page';
    res
        .status(404)
        .render(createPath('error'), {title});
});