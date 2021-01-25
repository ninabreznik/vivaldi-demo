const vivaldi = require('vivaldi-coordinates')
const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const RAM = require('random-access-memory')
const network_map = require('./index')()

start()

async function start () {
  // create nodes
  const node_0 = { id: 1, pos: vivaldi.create([0,0,0, 10]), geohash: 'tupb' }
  const node_1 = { id: 2, pos: vivaldi.create([0,0,0, 10]), geohash: 'tuws' }
  const node_2 = { id: 3, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }
  // create db
  network_map.make_db().then(async db_0 => {
    await update_coordinates({ // measure, update network position and store it in the db
      db: db_0,
      rtt: 200,
      local_node: node_0,
      remote_node: node_1
    })
    await update_coordinates({
      db: db_0,
      rtt: 100,
      local_node: node_0,
      remote_node: node_2
    })
    // get position for the key
    const current_pos = await network_map.get_pos(db_0, 1)
    console.log('--- Current Position ---', current_pos)
    // get a map of measurements from the db
    get_network_map(db_0).then((map) => {
      console.log('--- Map ---', JSON.stringify(map))
    })
  })

  function get_network_map (db) {
    return new Promise (async (resolve, reject) => {
      const stream = await network_map.get_map(db)
      const map = []
      stream.on('data', (entry) => {
        map.push([entry.key, JSON.parse(entry.value)])
      })
      stream.on('close', () => { resolve(map) })
    })
  }

  async function update_coordinates ({ db, rtt, local_node, remote_node }) {
    const new_pos = await network_map.update(rtt, local_node, remote_node)
    if (new_pos) await network_map.store_pos(db, [new_pos, remote_node])
  }

}
