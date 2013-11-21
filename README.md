darwin-dream
============

An attempt to create digital species derived from simple natural selection rules. JS/Three.js/WebGL


decrease of the population:
- aging and death

increase of the population:
- reproduction

environment:
- time cycles
- produces food every cycle

What do I want to see?
I want to see different species evolving

how are new species created from the old ones?

RULES
1) START: N SPECIES - maxCells=1, 1 cell organisms (everybody is pretty much equal at this stage)
2) EACH CYCLE
   GROWTH of a new cell at each cycle until maxCells is reached
   10% chances? of REPRODUCTION in area nearby (+/- 10 tiles?)
   1% chance of EVOLUTION/MUTATION(s) -> NEW SPECIES with 1 more cell allowed, direction of growth is random
3) NATURAL DEATH after 10 cycles (maxCells=10)

