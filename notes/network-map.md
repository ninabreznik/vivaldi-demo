# Latency to geolocation in DatDot


## Network Coordinate System based on latency

Network coordinate systems assign each node a position in the chosen space. The distance in the space is then equal to the latency. The aim is to find such coordinates
in the space that predict the latency with the lowest error.
There are various algorithms used for assigning the coordinates to the nodes. These algorithms typically work with the n-dimensional Euclidian or non-Euclidian spaces.

http://conferences.sigcomm.org/sigcomm/2004/papers/p426-dabek111111.pdf
- synthetic coordinates (used to predict the RTT between 2 nodes)
- error (estimated difference between rtt and calculated distance; squared-error function)
- distance function - predicts the latency (RTT)
- i moves a small distance in the direction of the force (force to minimize error)
to coordinates that predict error well - each node computes and continuously adjusts its coordinates based only on measured RTTs from the node to a handful
of other nodes and the current coordinates of those nodes.

>How it works

// Node i has measured node j to be rtt ms away,
// and node j says it has coordinates xj
simple vivaldi(rtt, xj)
// Compute error of this sample. (1)
e = rtt − kxi − xjk
// Find the direction of the force the error is causing. (2)
dir = u(xi − xj)
// The force vector is proportional to the error (3)
f = dir × e
// Move a a small step in the direction of the force. (4)
xi = xi + δ × dir

The simple vivaldi procedure is called whenever a new RTT measurement is available. simple vivaldi is passed an RTT measurement to the remote node and the remote node’s coordinates. The
procedure first calculates the error in its current prediction to the
target node (line 1). The node will move towards or away from the
target node based on the magnitude of this error; lines 2 and 3 find
the direction (the force vector created by the algorithm’s imagined
spring) the node should move. Finally, the node moves a fraction
of the distance to the target node in line 4, using a constant timestep
(δ).

>vivaldi object

- position: 3 coordinates (x, y and h)
- error (Each node compares each new measured RTT sample with the predicted RTT, and maintains a moving average of recent relative errors (absolute error divided by actual latency).)
							// Incorporate new information: node j has been
							// measured to be rtt ms away, has coordinates xj
							,
							// and an error estimate of ej
							.
							//
							// Our own coordinates and error estimate are xi and ei
							.
							//
							// The constants ce and cc are tuning parameters.
							vivaldi(rtt, xj
							, ej)
							// Sample weight balances local and remote error. (1)
							w = ei/(ei + ej)
							// Compute relative error of this sample. (2)
							es =
							
							
							kxi − xjk − rtt
							
							
							/rtt
							// Update weighted moving average of local error. (3)
							ei = es × ce × w + ei × (1 − ce × w)
							// Update local coordinates. (4)
							δ = cc × w
							xi = xi + δ ×
							
							rtt − kxi − xjk
							
							× u(xi − xj)

- nbUpdates


> LATENCY TO GEOGRAPHICAL DISTANCE

https://unitec.researchbank.ac.nz/bitstream/handle/10652/2384/VIVALDI.pdf?sequence=1&isAllowed=y
- The impact of using latency prediction on IP geolocation accuracy and efficiency
- For the purpose of the investigation, we implemented SOI (Speed of Internet) which is an IP geolocation technique based on latency measurement and, for latency prediction, we implemented the Vivaldi virtual coordinate system

- a target can estimate its own location by measuring latency to a set of landmarks
-  can be transferred to a geographical distance by the use of a latency-to-distance ratio
- The geographical distances are then used by multilateration to estimate the geographical position of the target

>OPTIMIZATION

- hierarchical feedback aggregation
	- instead of all peers to all peers
- zero maintainance costs
	- rely on other communication for gathering latency info
- normalizing the sum of forces
	- we don't refine coordinates with respect to one new node, but we refine our coordinates in respect to a set of nodes from which we have received an update recently
	- we normalize based on age (old info less weight)
- triange irregularity violation
    - latency between node triples can't form a triangle => nodes that have largest level of violation => remove them (removing 0.5% of worst violators = 20% improvement)
- storing coordinates
    - nodes leave and re-enter, make sure to remeber their last position
- filters
    - system-level coordinates vs. application-level coordinates
        - decide when the node coordinates have changed enough to make a reaction in the application (i.e. replace hoster)
        - distinguishing between a system-level coordinate that was moving around a single point (not requiring application-level notification) and one that had migrated to a new location (potentially requiring application activity (i.e. replace hoster))
        - compare windows of previous system-level coordinates to one another and augment this comparison with distances to other nodes in the system

### Existing communication

- hosting setup
  - 3 end <=> att
  - att <=> 3 host
- storage challenge
  - att <=> host
- performance challenge
  - regular att <=> host
  - att observer <= host
  - att observer <=> att observer
  - reg att <=> att observer

### Coordinates updates

- hosting setup
  - attestor (6 measurements)
- storage challenge
  - attestor should handle more checks to get more measurements
- performance challenge
  - att observer gets measurements from all hosters in swarm (3+) + from reg att in the swarm + other att observers (in same att swarm) + other att observers (for same feed swarm)
  - reg att gets measurements from all other reg att in the swarm + att observers in the att swarm

	## MODEL

- every node measures latency when interacting with another node (requesting data)
- node grabs the vivaldi pos of the remote node from the chain
- based on the vivaldi algorythm node re-adjusts its coordinates based on the measured differency between measured latency and distance between the nodes
- node updates it's vivaldi object on the chain
- every node notifies the chain about two things: its vivaldi position and it's geo location (geohash)
- chain calculates what is the most likely geolocation of particular node based on the median of all nodes with coordinates in a certain range (@TODO)
- based on this assigned geolocation we then select users to do the jobs in selected region (geolocation)(hosting etc.)
