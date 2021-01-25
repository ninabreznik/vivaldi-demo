const vivaldi = require('vivaldi-coordinates')
const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const RAM = require('random-access-memory')
const network_map = require('./network-map')()
const geo_map = require('./geo-map')
const { performance } = require('perf_hooks')
const fetch = require('node-fetch')

start()

async function start () {


  // chainAPI.getUserByID(1).network_map => returns { pos, geohash }
  const node_0 = { id: 1, pos: vivaldi.create([0,0,0, 10]), geohash: 'tupb' }
  const node_1 = { id: 11, pos: vivaldi.create([0,0,0, 10]), geohash: 'tupb' }
  const node_2 = { id: 22, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }
  const node_3 = { id: 33, pos: vivaldi.create([0,0,0, 10]), geohash: 'tupb' }
  const node_4 = { id: 34, pos: vivaldi.create([0,0,0, 10]), geohash: 'tupb' }
  const node_5 = { id: 35, pos: vivaldi.create([1,1,1, 10]), geohash: 'tupb' }
  const node_6 = { id: 36, pos: vivaldi.create([7,7,7, 10]), geohash: 'tupb' }
  const node_7 = { id: 37, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }
  const node_8 = { id: 38, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }
  const node_9 = { id: 39, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }
  const node_10 = { id: 40, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }
  const node_11 = { id: 41, pos: vivaldi.create([0,0,0, 10]), geohash: 'u328' }

  const node_0_start_pos = node_0.pos

  /* -------------------------
            ME
  ------------------------------- */

  network_map.make_db().then((db_0) => {
    network_map.make_db().then((db_1) => {
      network_map.make_db().then((db_2) => {
        network_map.make_db().then(async (db_3) => {
          // ------ MEASURE & UPDATE POSITION -------
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
            })
          await update_coordinates({
            db: db_1,
            rtt: await ping(5),
            local_node: node_1,
            remote_node: node_5
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(6),
            local_node: node_1,
            remote_node: node_6
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(7),
            local_node: node_1,
            remote_node: node_7
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(8),
            local_node: node_1,
            remote_node: node_8
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(9),
            local_node: node_1,
            remote_node: node_9
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(10),
            local_node: node_1,
            remote_node: node_10
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(11),
            local_node: node_1,
            remote_node: node_11
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(2),
            local_node: node_1,
            remote_node: node_2
            })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(3),
            local_node: node_2,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(2),
            local_node: node_3,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(3),
            local_node: node_0,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(3),
            local_node: node_3,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(2),
            local_node: node_0,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
            })
          await update_coordinates({
            db: db_1,
            rtt: await ping(2),
            local_node: node_1,
            remote_node: node_2
            })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(3),
            local_node: node_2,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(2),
            local_node: node_3,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(3),
            local_node: node_0,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(3),
            local_node: node_3,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(2),
            local_node: node_0,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
            })
          await update_coordinates({
            db: db_1,
            rtt: await ping(2),
            local_node: node_1,
            remote_node: node_2
            })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(3),
            local_node: node_2,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(2),
            local_node: node_3,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(3),
            local_node: node_0,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(3),
            local_node: node_3,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(2),
            local_node: node_0,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
            })
          await update_coordinates({
            db: db_1,
            rtt: await ping(2),
            local_node: node_1,
            remote_node: node_2
            })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(3),
            local_node: node_2,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_2,
            rtt: await ping(2),
            local_node: node_3,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_1,
            rtt: await ping(3),
            local_node: node_1,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(3),
            local_node: node_0,
            remote_node: node_3
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(3),
            local_node: node_3,
            remote_node: node_1
          })
          await update_coordinates({
            db: db_3,
            rtt: await ping(0),
            local_node: node_3,
            remote_node: node_0
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(2),
            local_node: node_0,
            remote_node: node_2
          })
          await update_coordinates({
            db: db_0,
            rtt: await ping(1),
            local_node: node_0,
            remote_node: node_1
          })
          // ------ GET A MAP -------
          get_network_map(db_0).then((map) => {
            console.log('MAP 0-----------------')
            console.log(JSON.stringify(map))
          })
          get_network_map(db_1).then((map) => {
            console.log('MAP 1-----------------')
            console.log(JSON.stringify(map))
            const median = get_median(map, 'tupb')
            map.forEach(entry => {
              const node = entry[1]
              const x = node['pos']._coordinates.x
              console.log(is_in_geohash(median, node, 'tupb'))
            })
          })
          get_network_map(db_2).then((map) => {
            console.log('MAP 2-----------------')
            console.log(JSON.stringify(map))
          })
          get_network_map(db_3).then((map) => {
            console.log('MAP 3-----------------')
            console.log(JSON.stringify(map))
          })

          // ------ GET POSITION FOR THE KEY -------
          const node_0_current_pos = await network_map.get_pos(db_0, 1)
          console.log(node_0_current_pos)

          // ------ CALCULATE DISTANCE BETWEEN POSITIONS ------
          vivaldi_distance(node_0.pos, node_1.pos)

        })
      })
    })
  })

  // ------------------------- GET DATA -------------------------------
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

  function vivaldi_distance (p1, p2) {
    var distance = vivaldi.distance(p1, p2)
    // console.log({distance})
  }

  function get_median (map, hashstring) {
    const list = []
    map.forEach(entry => {
      const node = entry[1]
      if (node['geohash'] === hashstring) {
        const x = node['pos']._coordinates.x
        const y = node['pos']._coordinates.y
        list.push({ x, y })
      }
    })
    // console.log({list})
    const median = geo_map.get_median(list)
    // console.log({median})
    return median
  }

  function is_in_geohash (median, node, hashstring) {
    const pos = { x: node['pos']._coordinates.x, y: node['pos']._coordinates.y }
    // console.log({pos})
    return geo_map.is_in(median, pos, hashstring)
  }

  /* -----------------------------------------------------------------------
                                  MEASURE & STORE
  -------------------------------------------------------------------------- */

  const urls = [
    'http://example.com/movies.json',  //92.242.132.24, UK (London)
    'http://datdot.org', //192.64.119.210, USA (LA)
    'http://dat-ecosystem.github.io', // 185.199.110.153, USA (San Francisco)
    'http://hypercore-protocol.org', //92.242.132.24, Northern Ireland (Belfast DG9)
    'https://marschall-gmbh.de/', // 217.160.0.106, Germany (Montabaur)
    'https://g0v.tw/', // 52.69.187.52, Japan (Tokyo)
    'http://datdot.org', //192.64.119.210, USA (LA)
    'http://dat-ecosystem.github.io', // 185.199.110.153, USA (San Francisco)
    'http://hypercore-protocol.org', //92.242.132.24, Northern Ireland (Belfast DG9)
    'https://marschall-gmbh.de/', // 217.160.0.106, Germany (Montabaur)
    'https://g0v.tw/', // 52.69.187.52, Japan (Tokyo)
    'http://datdot.org', //192.64.119.210, USA (LA)
    'http://dat-ecosystem.github.io', // 185.199.110.153, USA (San Francisco)
    'http://hypercore-protocol.org', //92.242.132.24, Northern Ireland (Belfast DG9)
    'https://marschall-gmbh.de/', // 217.160.0.106, Germany (Montabaur)
    'https://g0v.tw/' // 52.69.187.52, Japan (Tokyo)
  ]
  async function ping (num) {
    const t1 = performance.now()
    await fetch(urls[num])
    const t2 = performance.now()
    const rtt = t2 - t1
    console.log({rtt})
    return rtt
    // return 3
  }

  async function update_coordinates ({ db, rtt, local_node, remote_node }) {
    const new_pos = await network_map.update(rtt, local_node, remote_node)
    if (new_pos) await network_map.store_pos(db, [new_pos, remote_node])
  }

}
