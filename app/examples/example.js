// const geo_map = require('./geo-map')
//
// const hash1 = 'd44z'
// const hash2 = '6u7g'
//
// const distance = 4148
// console.log({distance})
// const sim_latency =  distance * 2 / 200000 * 1000
// console.log({sim_latency})


// ---------------------------------------
//
// var randomGeoHash = require('random-geohash')
//
// const r = randomGeoHash({ length: 4 })
// console.log(r)


// ---------------------------------------------

var geohash = require('s')
const coords = geohash.decode_bbox('tup')

console.log(coords)
