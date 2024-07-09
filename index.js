
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const loggingMiddleware = require('./middleware/logsReq.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT||4000;
const url = process.env.CONNECTION_URL;

app.use(loggingMiddleware);

const userRoutes = require('./routes/user.Routes.js');
app.use(bodyParser.json());
app.use('/user',userRoutes  );

app.use(express.json());

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
         app.listen(port,()=>{
            console.log(`Database connected and server is listening on port ${port}`);
         })
}).catch((err) => {
    console.log(err);
})


