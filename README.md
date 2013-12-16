darwin-dream
============

An attempt to create digital species derived from simple natural selection rules. JS/Three.js/WebGL

USAGE:
  Checkout the project and open index.html with your favorite browser!


METHOD:

decrease of the population:
- aging and death

increase of the population:
- reproduction

environment:
- time cycles
- produces food every cycle

Goal: watch different species emerging and taking over because they are better fit for their environment

how are new species created from the old ones?

RULES
1) START: N SPECIES - maxCells=1, 1 cell organisms (everybody is pretty much equal at this stage)
2) GROWTH of a new cell at each cycle until maxCells is reached
   10% chances? of REPRODUCTION in area nearby (+/- 10 tiles?)
   1% chance of EVOLUTION/MUTATION(s) -> NEW SPECIES with 1 more cell allowed, direction of growth is random
3) NATURAL DEATH after 10 cycles (maxCells=10) 
4) SUN: every tile receive 1 unit of SUN/ENERGY divided as follows:
1/2 for the highest cells, then 1/4, 1/8, 1/16 etc.
A creature needs 1/2 unit of sun to survive


TODO:
- Simulation class
- decouple rendering and model, remove circular references
- save/load Simulations to localStorage
