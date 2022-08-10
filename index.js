require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { PORT } =process.env;
const app = express();



// -->> USE MIDDLEWARE <<-- //
app.use(express.json());
app.use(cors());

// -->> IMPORT ROUTER <<-- //
const APIsRouter = require('./routers/APIs');
const getNimoneRouter = require('./routers/getNimone')

// -->> WOEK SPACE <<-- //
app.use('/api', APIsRouter);
app.use('/nimone', getNimoneRouter);
// app.use('/user')




app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})