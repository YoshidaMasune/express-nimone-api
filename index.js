require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { PORT } =process.env;
const app = express();



// -->> USE MIDDLEWARE <<-- //
app.use(express.json());
app.use(cors());

// -->> IMPORT ROUTER <<-- //
const APIsRouter = require('./routers/APIs')

// -->> WOEK SPACE <<-- //
app.use('/api', APIsRouter)




app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})