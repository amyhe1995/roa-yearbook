const fetch = require('node-fetch')

async function fetchGif(favouriteAnimal) {
  const gifURL = fetch(`https://api.giphy.com/v1/gifs/translate?api_key=00x1XyHdBt5WpO2K66xXU4DGo6Oa0TM2&s=${favouriteAnimal}`)
  .then((res) => {
    return res.json()
  }).then((res) => {
    return res.data.images.original.url
  })
  return gifURL
}

module.exports = fetchGif