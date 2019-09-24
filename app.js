const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const movieData = require ('./movies-data.js');
require ('dotenv').config();

const app = express();
app.use(morgan('common'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200);
  res.send(movieData);
});

app.get('/movie', (req, res) => {
  const genre = req.query.genre ? req.query.genre.toLowerCase() : '';
  const country = req.query.country ? req.query.country.toLowerCase() : '';
  const avg_vote = req.query.avg_vote ? parseFloat(req.query.avg_vote) : '';

  let filteredMovies = [...movieData];

  if (genre){
    filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase().includes(genre));
  }
  if (country){
    filteredMovies = filteredMovies.filter(movie => movie.country.toLowerCase().includes(country));
  }
  if (avg_vote){
    filteredMovies = filteredMovies.filter(movie => movie.avg_vote >= avg_vote);
  }
  res.send(filteredMovies);


});



app.listen(8000, () => {
  console.log("Listening on port 8000");
});
