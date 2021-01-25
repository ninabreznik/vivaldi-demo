const http = require('http')
const { performance } = require('perf_hooks')
const fetch = require('node-fetch')
const vivaldi = require('vivaldi-coordinates')
const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const RAM = require('random-access-memory')
const simulate = require('scenario-simulator')
const nodes = require('../get-nodes')(100)
console.log({nodes})

const network_map = require('network-map')()
const GeoHash = require('geohash-plus')
var db

const { pid, list } = simulate(async msg => {
  const text = msg.toString()
  const [command, args = ''] = text.split(':')
  if (command === 'start') return start(args)
  if (command === 'stop') return stop(args)
  console.log(`
    available commands:
    $> /i start:
    # starts regular round-trip-time measurements
    $> /i stop:
    # stops regular rount-trip-time measurements
  `)
})

// console.log({ pid, list })
const [name, port] = pid.split(':')

const position = list.indexOf(pid)
const local_node = nodes[position]

const server = http.createServer(handler)
server.listen(port, async () => {
  db = await network_map.make_db()
  await network_map.store_pos(db, [local_node])
  // console.log(`process running on "http://localhost:${port}"`)
  start()
})

async function handler (req, res) {
  const url = req.url
  const { remoteAddress, remotePort, localAddress, localPort } = req.connection
  // console.log(pid, { remoteAddress, remotePort, localAddress, localPort })

  if (req.method === 'POST') {
      var body = ''
      req.on('data', chunk => {
          body += chunk.toString()
      })
      const id = local_node.id
      const { pos: { _coordinates: { x, y, h }, _error }, geohash } = await network_map.get_val(db, id).catch(err => {})
      const reqestor_geohash = body
      const distance = GeoHash.get_geohash_dist(reqestor_geohash, geohash)
      const sim_latency =  distance * 2 / 200000 * 1000
      // console.log({sim_latency}, {reqestor_geohash}, {geohash})
      req.on('end', () => {
          setTimeout(async() => {
            const response = { x, y, h, _error }
            res.end(JSON.stringify(response))
          }, sim_latency)
      })
  }

}


/******************************************************************************
  COMMANDS
******************************************************************************/
var id
function start (args = '') {
  if (id) return
  id = setInterval(measure, 4000)
}
function stop (args = '') {
  if (!id) return
  id = void clearInterval(id)
}
/******************************************************************************
  HELPER
******************************************************************************/
// ------------------------- MEASURE -------------------------------

function get_random_neighbor (nodes, position) {
  var i
  while (!i || i === position) {
    i = Math.floor(Math.random() * nodes.length)
  }
   return i
}

async function measure () {
  const i = get_random_neighbor(nodes, position)
  const remote_node = nodes[i]
  const [name, port] = list[i].split(':')

  const t1 = performance.now()
  const id = local_node.id
  const { geohash } = await network_map.get_val(db, id).catch(err => {})
  const data = geohash
  const url = 'http://localhost:' +  port
  const opts = {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: data
  }
  const result = await fetch(url, opts).then(res => res.text())
  const t2 = performance.now()
  const { x, y, h, _error } = JSON.parse(result)
  remote_node.pos = vivaldi.create([x, y, h, _error])

  await update_coordinates({
    db: db,
    rtt: t2 - t1,
    local_node,
    remote_node
  })

  // setTimeout(() => {
  //   // ------ GET A MAP -------
  //   get_network_map(db).then((map) => {
  //     console.log('MAP for node -----------------', local_node.id)
  //     // console.log(JSON.stringify(map))
  //     const hashstring = 'tup'
  //     const mean = get_mean(map, hashstring)
  //     console.log(`MEAN for ${hashstring} is: ${JSON.stringify(mean)}`)
  //     if (mean) {
  //       map.forEach(entry => {
  //         const node = entry[1]
  //         const x = node['pos']._coordinates.x
  //         const y = node['pos']._coordinates.y
  //         const calc_geohash = GeoHash.encode(x,y)
  //         const is_in = is_in_geohash(mean, node, hashstring)
  //         console.log(`${JSON.stringify(node)} ------- Is in? ${is_in}`)
  //       })
  //     }
  //   })
  // }, 100000)
  //
  setTimeout(() => {
    // ------ GET A MAP -------
    get_network_map(db).then((map) => {
      console.log('MAP for node -----------------', local_node.id)
      console.log(JSON.stringify(map))
      const hashstring = 'tu'
      const median = get_median(map, hashstring)
      console.log(`MEDIAN for ${hashstring} is: ${JSON.stringify(median)}`)
      if (median) {
        map.forEach(entry => {
          const node = entry[1]
          const x = node['pos']._coordinates.x
          const y = node['pos']._coordinates.y
          const calc_geohash = GeoHash.encode(x,y)
          const is_in = is_in_geohash(median, node, hashstring)
          console.log(`${JSON.stringify(node)} ------- Is in? ${is_in}`)
        })
      }
    })
  }, 10000)
}
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
  console.log({list})
  const median = GeoHash.get_median(list)
  // console.log({median})
  return median
}

function get_mean (map, hashstring) {
  const list = []
  map.forEach(entry => {
    const node = entry[1]
    if (node['geohash'] === hashstring) {
      const { x, y } = entry[1]['pos']._coordinates
      list.push({ x, y })
    }
  })
  return GeoHash.get_mean(list)
}

function is_in_geohash (median, node, hashstring) {
  const pos = { x: node['pos']._coordinates.x, y: node['pos']._coordinates.y }
  // console.log({pos})
  return GeoHash.is_in(median, pos, hashstring)
}


/* -----------------------------------------------------------------------
                                MEASURE & STORE
-------------------------------------------------------------------------- */

async function update_coordinates ({ db, rtt, local_node, remote_node }) {
  const new_pos = await network_map.update(rtt, local_node, remote_node)
  if (new_pos) await network_map.store_pos(db, [new_pos, remote_node])
}
