const express = require("express");
//const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;


/*const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
  };
app.use(cors(corsOptions));*/


const customer = require('./route/customer');
const booking = require('./route/booking');
const destination = require('./route/destination');
const meeting = require('./route/meeting');
const trip = require('./route/trip');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', customer);
app.use('/v1', booking);
app.use('/v1', destination);
app.use('/v1', meeting);
app.use('/v1', trip);

app.get("/", (req, res) => {
    res.send("Hello! Node.js");
});

app.listen(port, () => {
    console.log("Starting node.js at port " + port);
});