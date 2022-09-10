const express = require('express')
const cors = require('cors')
const { Pool } = require("pg");
const dotenv = require("dotenv");

const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();


const port = process.env.PORT || 8080

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true,
  ssl: { rejectUnauthorized: false },
});
console.log(process.env.PG_USER)
app.get('/', (req, res) => {
    res.send([{
        "title": 'game 1',
        "author": 'author 1',
        "id": '1'
    }, {
        "title": 'game 2',
        "author": 'author 2',
        "id": '2'
    }
    ]
    )
})

app.get("/api/games", (req, res) => {
    pool
    .query(`SELECT * from BoardGames;`)
      .then((data) => {
        console.log(data) 
        res.json(data.rows);
      })
      .catch((e) => {
        res.status(400).send({
          error: e.message,
        });
      });
  });

app.listen(port, () => console.log('connected to ElephantSQL'))