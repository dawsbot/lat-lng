# lat-long
[![Build Status][travis-image]][travis-url] ![][node-version-image]

> 📍🌎 A micro-service for physical address -> lat-long

 When you need latitude and longitude, avoid Google's API limits by using this endpoint instead. `lat-long` uses [Google's API](https://developers.google.com/maps/documentation/geocoding/intro) to accurately resolve latitude and longitude with caching .

⚡️ Simple caching layer on top, so repeat calls are served faster

👌 Only 35 LOC

## Example

JavaScript is used here because it's popular and straightforward to reason about. Any language could be used:

Request:

```js
fetch('https://lat-long.now.sh/?address=Portland,OR')
  .then(res => res.json())
  .then(res => console.log(res));
```

Response:

```json
{
  "formattedAddress": "Portland, OR, USA",
  "lat": 45.5230622,
  "lng": -122.6764816
}
```

Other valid examples:

* ['https://lat-long.now.sh/?address=San+Francisco'](https://lat-long.now.sh/?address=San+Francisco)
* ['https://lat-long.now.sh/?address=Boulder,+Colorado'](https://lat-long.now.sh/?address=Boulder,+Colorado)


## License

MIT © [Dawson Botsford](http://dawsonbotsford.com)

[travis-image]: https://travis-ci.org/dawsbot/lat-long.svg?branch=master
[travis-url]: https://travis-ci.org/dawsbot/lat-long
[xo-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/sindresorhus/xo
[node-version-image]: https://img.shields.io/badge/Node-v7-ff69b4.svg
