const axios = require('axios');

const API_BASE = "https://ms.sc-jpl.com/web/";
const LATEST_TILESET_API = API_BASE + "getLatestTileSet";
const POI_PLAYLIST_API = API_BASE + "getPoiPlaylist";
const PLAYLIST_API = API_BASE + "getPlaylist";
const SEARCH_CARDS_API = API_BASE + "getSearchCards";
const GEO_IP_API = API_BASE + "getGeoIp";

const TILE_SET_TYPE_POI = "POI";
const TILE_SET_TYPE_HEAT = "HEAT";
const TILE_SET_FLAVOR_DEFAULT = "default";
const DEFAULT_ZOOM_LEVEL = 12;
const DEFAULT_RADIUS_METERS = 10000;

// returns all the snaps in the given radius at the specified lat, lon coordinates
function getPlaylist(lat, lon, radius, zoom) {
  return getEpoch(TILE_SET_TYPE_HEAT).then(function(epoch) {
    var requestBody = {
      requestGeoPoint: {
        lat: lat,
        lon: lon
      },
      zoomLevel: (zoom) ? zoom : DEFAULT_ZOOM_LEVEL,
      tileSetId: {
        flavor: TILE_SET_FLAVOR_DEFAULT,
        epoch: epoch,
        type: TILE_SET_TYPE_HEAT
      },
      radiusMeters: (radius) ? radius : DEFAULT_RADIUS_METERS
    };
    return axios.post(PLAYLIST_API, requestBody)
    .then(function (response) {
      return response.data.manifest;
    })
    .catch(function (error) {
      return error;
    });
  });
}

// returns all the snaps for the given story id
function getPoiPlaylist(id) {
  return getEpoch(TILE_SET_TYPE_POI).then(function(epoch) {
    var requestBody = {
      tileSetId: {
        flavor: TILE_SET_FLAVOR_DEFAULT,
        epoch: epoch,
        type: TILE_SET_TYPE_POI
      },
      id: id
    };
    return axios.post(POI_PLAYLIST_API, requestBody)
    .then(function (response) {
      if(response.data.manifest) {
        return response.data.manifest;
      }
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
  });
}

// returns the search results for a specific query
function getSearchCards(query, lat, lng, zoom) {
  var requestBody = {};
  if(lat && lng) {
    requestBody.mapLocation = {
      lat: lat,
      lng: lng
    }
  }
  if(zoom) { requestBody.zoom = zoom; }
  if(query) { requestBody.query = query; }
  return axios.post(SEARCH_CARDS_API, requestBody)
  .then(function(response) {
    return response.data.searchCards.sections;
  })
  .catch(function(error) {
    return error;
  });
}

// returns the approximate latitude and longitude coordinates inferred from the requesting IP address
function getGeoIp() {
  return axios.post(GEO_IP_API, {})
  .then(function (response) {
    var point = response.data.point;
    var coords = point.coordinates;
    return [coords[1], coords[0]]; // API returns [lon, lat] so we swap the indexes and return [lat, lon]
  })
  .catch(function (error) {
    return error;
  });
}

// returns the 'tileSetInfos' array containing the epoch required for making requests [used interally only]
function getLatestTileSet() {
  return axios.post(LATEST_TILESET_API, {})
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
}

// returns the correct 'epoch' variable used to make requests [used interally only]
// type can either be 'POI' or 'HEAT'
function getEpoch(type) {
  return getLatestTileSet().then(function(response) {
    var tileSetInfos = response.data.tileSetInfos;
    switch(type) {
      case TILE_SET_TYPE_POI:
      return tileSetInfos[0].id.epoch;
      case TILE_SET_TYPE_HEAT:
      return tileSetInfos[1].id.epoch;
      default: return 0;
    }
  })
  .catch(function (error) {
    return error;
  });
}

module.exports = {
  getPlaylist: getPlaylist,
  getPoiPlaylist: getPoiPlaylist,
  getSearchCards: getSearchCards,
  getGeoIp: getGeoIp
}