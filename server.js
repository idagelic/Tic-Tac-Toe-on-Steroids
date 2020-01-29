const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mysql = require('mysql');

const SELECT_ALL_SCORES_QUERY = 'SELECT * FROM scores';

let con = mysql.createConnection({
  host: "localhost",
  database: "react",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/api/scores/add', (req, res) => {
  const { name, win, sign } = req.query;

  console.log(name, win, sign);
  
  con.query('SELECT * FROM scores WHERE name=?', name,
    function(err, results){
      if(err){
        con.end();
        return console.log(err);
      }

      if(results.length == 0) {
        con.query('INSERT INTO scores (name, wins, losses, games_as_x, games_as_o) VALUES(?, ?, ?, ?, ?) ', [name,0,0,0,0]);
      }
      if(win == '1') con.query('UPDATE scores SET wins = wins + 1 WHERE name=?', name);
      if(win == '0') con.query('UPDATE scores SET losses = losses + 1 WHERE name=?', name);
      if(sign == 'X' || sign == 'x') con.query('UPDATE scores SET games_as_x = games_as_x + 1 WHERE name=?', name);
      if(sign == 'O' || sign == 'o') con.query('UPDATE scores SET games_as_o = games_as_o + 1 WHERE name=?', name);
    });

  res.send('Success!');
});


app.get('/api/scores', (req,res) => {
  con.query(SELECT_ALL_SCORES_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));