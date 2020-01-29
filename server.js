const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const axios = require('axios');
const pg = require('pg');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;
const client = new pg.Client(process.env.DATABASE_URL);

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req, res) => {
  res.send('connected');
})

app.all('/postRank',(req, res) => {
  let {player, difficulty, timeLeft, chancesLeft, hintsLeft} = req.body;
  let safeValues = [player, difficulty, timeLeft, chancesLeft, hintsLeft];
  console.log(safeValues);
})

app.get('/showRanks',(req, res) => {
  const SQL = 'SELECT * FROM bym_rank;';
})

app.get('*',(req, res) => {
  res.status(404).send('not found');
})

client.connect()
  .then(() => {
    console.log('connected to db');
    app.listen(port, () => console.log(`app is listening on ${port}`));
  })
  .catch(err => {
    throw `PG Startup Error: ${err.message}`;
  })
