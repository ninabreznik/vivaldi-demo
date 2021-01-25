# vivaldi demo app

```bash
clone https://github.com/ninabreznik/vivaldi-demo.git

cd vivaldi-demo

npm install

npm start 1 9000
```


`get-nodes.js`

- creates demo nodes with default vivaldi locations and random geohash
- 13 of the nodes are assigned the same geohash ('tu')

`scenario/1.js`

- spawns x processes in parallel

`app/index.js`

- logic of a single process:
  - creates a hyperbee instance (db)
  - in regular interval connects to a random node and measures the RTT
  - updates its vivaldi coordinates and publishes its new coordinates + random other node's coordinates to the db
  - responds to other node's requests (with simulated latency, based on the distance between geohashes)
  - in regular intervals each running proess logs a full map of that node
    + checks for every node if it is part of the 'tu' geohash and logs the results
