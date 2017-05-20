const app = {}

app.apiUrl = 'https://api.spotify.com/v1'

// Allow user to enter some names
app.events = function () {
  $('form').on('submit', function(e) {
    e.preventDefault();
    let artists = $('input[type=search]').val()
    artists = artists.split(',')
    let search = artists.map(artistName => app.searchArtist(artistName))
    // ... is a spread operator, spreading out items in the array
    $.when(...search)
      .then((...results) => {
        results = results[0].artists.items[0].id
        console.log(results)
      })
  })
}

// Go to spotify and get those artists
app.searchArtist = (artistName) => $.ajax({
  url: `${app.apiUrl}/search`,
  method: 'GET',
  dataType: 'json',
  data: {
    q: artistName,
    type: 'artist'
  }
})

// With the IDs we want to get albums
app.getArtistAlbums = arthistId => $.ajax({
  url:  `${app.apiUrl}/artists/${artistId}/albums`,
  method: 'GET',
  dataType: 'json',
  data: {
    album_type: 'album'
  }
})

// Then get tracks

// Then build playlist

app.init = function () {
  app.events()
}

$(app.init)
