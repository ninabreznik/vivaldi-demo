const vivaldi = require('vivaldi-coordinates')
const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const RAM = require('random-access-memory')

module.exports = network_map

function network_map () {

	async function make_db () {
		return new Promise((resolve, reject) => {
			const feed = Hypercore(RAM)
			const db = new Hyperbee(feed, { keyEncoding: 'utf-8', valueEncoding: 'binary' })
			resolve(db)
		})
	}

	async function update (rtt, local_node, remote_node) {
		const { id: local_ID, pos: p1 } = local_node
		const { id: remote_ID, pos: p2 } = remote_node
		const updated = vivaldi.update(rtt, p1, p2)	// update local position
		if (updated) return local_node
	}

	async function store_pos (db, arr) {
		for (var i = 0, len = arr.length; i < len; i++) {
			const { id, pos, geohash } = arr[i]
			// console.log('Storing new position', {id}, JSON.stringify(pos))
			const val = { pos: pos, geohash }
			await db.put(id, JSON.stringify(val))
		}
	}

	async function get_val (db, key) {
		const data = await db.get(key)
		return JSON.parse(data.value)
	}

	async function get_pos (db, key) {
		const data = await db.get(key)
		const { pos: { _coordinates: { x, y, h }, _error, _nbUpdates } } = JSON.parse(data.value)
		const pos = vivaldi.create([x, y, h, _nbUpdates])
		pos._error = _error
		return pos
	}

	async function get_map (db) {
		const stream = db.createReadStream()
		return stream
	}

	return {
		make_db,
		update,
		store_pos,
		get_pos,
		get_map,
		get_val
	}
}
