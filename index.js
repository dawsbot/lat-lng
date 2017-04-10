const url = require('url');
const fetch = require('node-fetch');
const {send} = require('micro');

const cache = {};

module.exports = async (req, res) => {
  const query = url.parse(req.url, true).query;
  const address = query.address;
  if (!address) {
    return send(res, 400, {error: 'address param required'});
  }
  // Strange encoding-style described by Google here: https://developers.google.com/maps/documentation/geocoding/intro
  const encodedAddress = address.replace(' ', '+');
  if (cache[encodedAddress]) {
    console.log(`cache hit for address "${encodedAddress}"`);
    return cache[encodedAddress];
  }
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`)
    .then(res => res.json())
    .then(res => {
      return Object.assign({}, {
        formattedAddress: res.results[0].formatted_address
      }, res.results[0].geometry.location);
    })
    .then(res => {
      console.log(`cache miss for address "${encodedAddress}"`);
      // Save to cache
      cache[encodedAddress] = res;
      return res;
    })
    .catch(() => {
      return send(res, 400, {error: `address ${encodedAddress} not found by Google API`});
    });
};
