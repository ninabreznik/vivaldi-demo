var randomGeoHash = require('random-geohash')
const vivaldi = require('vivaldi-coordinates')

module.exports = get_nodes

function get_nodes (nb = 10) {
  var nodes = [...new Array(nb)]
  nodes = nodes.map((node, i) => ({ id: i, pos: vivaldi.create([0,0,0, 10]), geohash: randomGeoHash({ length: 2 }) }))
  const more_nodes = [
    { id: 100, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 101, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 102, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 103, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 104, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 105, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 106, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 107, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 108, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 109, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 110, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 111, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' },
    { id: 112, pos: vivaldi.create([0,0,0, 10]), geohash: 'tu' }
  ]
  nodes.push(...more_nodes)
  return nodes
}
