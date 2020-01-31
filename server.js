const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const axios = require('axios');
const pg = require('pg');
require('dotenv').config();
const port = process.env.PORT || 3001;
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

var corsOptions = {
  origin: 'http://willhuanganimator.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req, res) => {
  res.send('connected');
})

app.post('/postRank', cors(corsOptions), (req, res) => {
  let {player, difficulty, time, chance, hint, total} = req.body;
  let SQL = 'INSERT INTO bym_rank(player_name, difficulty, time_left, chances_left, hints_left, total) VALUES ($1, $2, $3, $4, $5, $6);'
  let safeValues = [player, difficulty, time, chance, hint, total];
  
  client.query(SQL, safeValues)
    // .then(result => {
    //   console.log(result);
    // })
    .catch(error => {console.error(error)})
})

app.get('/showRanks', cors(corsOptions), (req, res) => {
  const SQL = 'SELECT * FROM bym_rank;';
  client.query(SQL)
    .then(result => {
      res.send(result);
    })
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
