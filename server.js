const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const exams = require('./routes/api/exams');
dotenv.config({ path: './config.env'});
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(cookieParser());
mongoose.connect(`${process.env.MONGO_URL}`,{ useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('Mongodb is on');
}).on('error', (error) => {
    console.log(error);
})
app.use('/api/exams',exams);
app.use('/api/users',users);
const authenticate = (req,res,next) => {
    next();
}
// app.get('/about',authenticate, (req,res) => {
//     res.send('about ');
// })

if(process.env.NODE_ENV == 'production'){
    app.use(express.static("client/build"));
}

app.listen(port, () => console.log(`Started on http://localhost:${port}`))
