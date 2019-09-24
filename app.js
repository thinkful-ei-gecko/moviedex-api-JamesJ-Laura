const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const moviedata = require ('./movies-data.js');
require ('dotenv').config();

const app = express();
app.use(morgan('common'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200);
  res.send(moviedata);
});



app.listen(8000, () => {
  console.log("Listening on port 8000");
});
