const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');
const CandidateRouter = require('./Routes/CandidateRouter');

// Load DB connection
require('./Models/db');
const config = require('./config');
const PORT = config.PORT;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);
app.use('/candidates', CandidateRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})