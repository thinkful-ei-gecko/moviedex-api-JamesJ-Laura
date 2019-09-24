const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const helmet = require('helmet');
const movieData = require ('./movies-data.js');
require ('dotenv').config();

const app = express();
app.use(morgan('common'));
app.use(cors());
app.use(helmet());

function authorize(req, res, next) {  
  if(!req.headers.authorization) {
    res.send('Bearer token is required!');
  }
  const token = req.headers.authorization.split(' ')[1];
  if(token !== process.env.API_KEY) {
    res.send('Provided token is invalid!');
  }
  next();
}
app.use(authorize);

app.get('/', (req, res) => {
  res.status(200);
  res.send(movieData);
});

app.get('/movie', authorize, (req, res) => {
  const genre = req.query.genre ? req.query.genre.toLowerCase() : '';
  const country = req.query.country ? decodeURI(req.query.country).toLowerCase() : '';
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
