# network-map

## Network Coordinate System based on latency

Network coordinate systems assign each node a position in the chosen space. The distance in the space is then equal to the latency. The aim is to find such coordinates in the space that predict the latency with the lowest error. There are various algorithms used for assigning the coordinates to the nodes. These algorithms typically work with the n-dimensional Euclidian or non-Euclidian spaces.

## API

`make_db()`

 Create a hyperbee db instance

`update(db, rtt, local_node, remote_node)`

Update position of the local node

`store_pos(db, nodes)` // const node = [{ id, pos, opts }]

Store positions of selected nodes in the db

`get_pos`

Get position for the selected key from the db

`get_map`

Create a read stream from the db

`get_val`

Get value for selected key from the db

```js
const network_map = require('network-map')()

// create a hypercore db instance

const db = network_map.make_db.then(db => {
  // measure RTT and update syntetic network coordinates accordingly  
  const updated = await network_map.update_coordinates({ db, rtt, local_node, remote_node })
  // => bool
})
```

## Vivaldi algorithm

- synthetic coordinates (used to predict the RTT between 2 nodes)
- error (estimated difference between rtt and calculated distance; squared-error function)
- distance function - predicts the latency (RTT)
- i moves a small distance in the direction of the force (force to minimize error)
to coordinates that predict error well - each node computes and continuously adjusts its coordinates based only on measured RTTs from the node to a handful
of other nodes and the current coordinates of those nodes.

Source: http://conferences.sigcomm.org/sigcomm/2004/papers/p426-dabek111111.pdf

## How vivaldi works

Node i has measured node j to be rtt ms away, and node j says it has coordinates xj

simple vivaldi(rtt, xj)

Compute error of this sample. (1)
e = rtt − kxi − xjk

Find the direction of the force the error is causing. (2)
dir = u(xi − xj)

The force vector is proportional to the error (3)
f = dir × e

Move a a small step in the direction of the force. (4)
xi = xi + δ × dir
