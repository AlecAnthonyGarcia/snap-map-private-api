const express = require('express');
const snapMap = require('../lib');
const app = express();

app.get('/', (req, res) => {
  
  // get snaps around Union Square, San Francisco, CA
  snapMap.getPlaylist(37.787975, -122.407515, 3000, 12).then(function(playlist) {
    console.log(playlist);
  });
  
  // get snaps for the Bay Bridge story
  snapMap.getPoiPlaylist("5016cb954d2f288c").then(function(playlist) {
    console.log(playlist);
  });
  
  // get search results for "San Francisco"
  snapMap.getSearchCards("San Francisco", 37.787975, -122.407515, 12).then(function(searchCards) {
    console.log(searchCards);
  });
  
  // get your IP address
  snapMap.getGeoIp().then(function(geoIp) {
    console.log(geoIp);
  });
  
  res.send("Check your server console for the example's output.");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))