fetch('http://localhost:8000/movie', {
  headers: {
    Authorization: 'Bearer jamesj-key' // obviously would not leave this in normally!
  }
})
  .then(res => res.json())
  .then(data => console.log(data));