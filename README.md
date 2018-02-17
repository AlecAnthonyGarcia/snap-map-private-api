# Snap Map Private API
Node.js wrapper for Snap Map's private API.

<img src="https://user-images.githubusercontent.com/2003684/36344752-b5343eb6-13d3-11e8-9e3e-0f68866b1e73.png" width="64" height="64"/>

----

## API Methods

### .getPlaylist(lat, lon, radius, zoom)
Returns all the snaps in the given radius at the specified lat, lon coordinates 

* Parameters

```
lat: Number - latitude coordinate
lon: Number - longitude coordinate
radius: Number - radius (in meters)
zoom: Number - map zoom level (2-18)
```

* Returns

```
totalDuration: Number - total duration (in seconds) of all the returned snaps combined
totalCount: Number - total number of returned snaps
elements: Array - contains objects with all the snap's info
```

### .getPoiPlaylist(id)
Returns all the snaps for the given story id

* Parameters

```
id: String - id of the story
```

* Returns

```
id: String - id of the story
title: Object - contains a "strings" array with localized titles and a "fallback" title string
totalDuration: Number - total duration (in seconds) of all the returned snaps combined
totalCount: Number - total number of returned snaps
elements: Array - contains objects with all the snap's info
```

### .getSearchCards(query, lat, lng, zoom)
Returns the search results for a specific query

* Parameters

```
query: String - search query
lat: Number - latitude coordinate
lng: Number - longitude coordinate
zoom: Number - map zoom level (2-18)
```

* Returns

Returns an array of objects containing different "sections" in a search list.
The section objects can have the following types: "FRIENDS_MAP", "FRIENDS_ALL", "STORIES", "TOP_STORIES", and "LOCATIONS".

Right now the friends-related sections aren't used, but if you want to gather all the search results together, iterate through each section and check for each section's "rows" array.
Each section's "rows" array will contain objects with a "poiRow" object. The "poiRow" object will contain all the details about the search result. Some "poiRow" objects even contain a "manifest" object which contains all the snaps for that location.
Below is an example of what the search cards API returns.

```
[
  {
    "type": "STORIES",
    "headline": "Stories",
    "numToShow": 3
  },
  {
    "type": "LOCATIONS",
    "headline": "Locations",
    "numToShow": 3,
    "rows": [
      {
        "poiRow": {
          "id": "39a8c892c97c9cd5",
          "latlng": {
            "lat": 37.826586864,
            "lng": -122.421741964
          },
          "zoom": 11.99,
          "timestamp": 1518820036000,
          "titleFmt": "Alcatraz",
          "subtitleFmt": "San Francisco, California",
          "thumb": {
            "id": "fmKOe_sZoegJ9gaUblhn5aA",
            "key": "8QcT+IhytXK2dKoPKeX72+zCkvO3zMcuUlel3wFWs8E=",
            "iv": "kZamWTQe1Ck2YgEo8uvl0w==",
            "snapId": "globallivestory~711f683ccebc6aaa5c282834b167d59e"
          },
          "manifest": {
          ...
          }
        }
      }
    ]
  }
]
```

### .getGeoIp()
Returns the approximate latitude and longitude coordinates inferred from the requesting IP address

* Returns

```
[latitude, longitude]
```

----

## Snap Object

The API methods return an "elements" array with objects containing all the informtion for the snap. Below is an example of the snap object.

```
{
  "id": "W7_EDlXWTBiXAEEniNoMPwAAYQNjQ3hWpSLgTAWGb2UQKAWGb2UAxAHanAA",
  "duration": 9.99791225,
  "timestamp": "1518738128000",
  "sssId": "globallivestory~9b263ea18f4a172d1ea4f39484072fa8",
  "snapInfo": {
    "snapMediaId": "f0-v7-CKoELOO5GX1J4DJPQ",
    "snapMediaType": "SNAP_MEDIA_TYPE_VIDEO",
    "mediaKey": "CsV+8pYE7+Q6NcGIaAYrLYIPK+2f+6ZI5bActl26T\/w=",
    "mediaIv": "sGgIp5jAEJufRY53HV9AMA==",
    "mediaUrl": "https:\/\/app.snapchat.com\/bq\/story_blob?story_id=f0-v7-CKoELOO5GX1J4DJPQ&t=10&mt=1",
    "title": {
      "strings": [
        {
          "locale": "ar",
          "text": "\u0643\u0627\u0644\u064a\u0641\u0648\u0631\u0646\u064a\u0627"
        },
        {
          "locale": "de",
          "text": "Kalifornien"
        },
        {
          "locale": "en",
          "text": "California"
        },
        {
          "locale": "es",
          "text": "California"
        },
        {
          "locale": "fr",
          "text": "Californie"
        },
        {
          "locale": "pt",
          "text": "Calif\u00f3rnia"
        },
        {
          "locale": "ru",
          "text": "\u041a\u0430\u043b\u0438\u0444\u043e\u0440\u043d\u0438\u044f"
        },
        {
          "locale": "zh",
          "text": "\u52a0\u5229\u798f\u5c3c\u4e9a\u5dde"
        }
      ],
      "fallback": "California"
    },
    "streamingMediaInfo": {
      "prefixUrl": "https:\/\/s.sc-jpl.com\/globallivestory~9b263ea18f4a172d1ea4f39484072fa8\/f0-v7-CKoELOO5GX1J4DJPQ\/FB1V5wZajaIfET7H_Layk7HVYA8bGfg7WzjQ-MUp76o=\/default\/",
      "compositeUrl": "media_composite.zip",
      "segmentCompositeUrl": "media_segment_composite.zip",
      "segmentPreviewCompositeUrl": "media_seg_prev_composite.zip",
      "overlayUrl": "overlay.png",
      "previewUrl": "preview.jpg",
      "mediaUrl": "media.mp4",
      "mediaSize": "570756",
      "mediaVideoUrl": "media_video.mp4",
      "mediaVideoSize": "475908",
      "mediaAudioUrl": "media_audio.mp4",
      "mediaAudioSize": "90562",
      "mediaVideoIndexSize": "1022",
      "mediaVideoSegmentSize": [
        "50676"
      ],
      "mediaAudioIndexSize": "963",
      "mediaAudioSegmentSize": [
        "13569"
      ],
      "mediaM3u8Url": "media_main.m3u8",
      "muxedCompositeUrl": "media_muxed_composite.zip"
    },
    "contextHint": {
      "hint": "ON",
      "timestamp": "1518738161726"
    }
  },
  "tapAction": {
    "elementId": "W7_EDlXWTBiXAEEniNoMPwAAYPAsHfcHfpaEaAWGb2UW-AWGb2UHNAHanAA"
  }
}
```

If you want to display the snap, you must construct the URL using the "prefixUrl" as the base and append the "mediaUrl".
If you need a thumbnail, you can use the "previewUrl", which is a still image of the snap.
Some snaps also have an "overlayUrl" which is used to display the snap's filter or caption text. It's your job to load the overlay image and actually overlay it over the snap.

```
{
  ...,
  "snapInfo": {
    ...,
    "streamingMediaInfo": {
      "prefixUrl": "https://s.sc-jpl.com/globallivestory~9b263ea18f4a172d1ea4f39484072fa8/f0-v7-CKoELOO5GX1J4DJPQ/FB1V5wZajaIfET7H_Layk7HVYA8bGfg7WzjQ-MUp76o=/default/",
      "overlayUrl": "overlay.png", // overlay used to show filter or caption text (not every snap will have this)
      "previewUrl": "preview.jpg", // preview thumbnail image
      "mediaUrl": "media.mp4", // video file url
      ...,
    },
    ...
  },
  ...
}
```


## License

MIT

## Legal

This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by Snapchat or any of its affiliates or subsidiaries. This is an independent project that utilizes Snapchat's unofficial API. Use at your own risk.