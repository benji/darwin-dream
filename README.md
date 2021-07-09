Darwin's Dream (JavaScript)
==============

https://benji.github.io/darwins-dream/

<b>This project has been abandoned in favor of the C++ version for performance reasons.</b>

An attempt to **create digital species derived from simple natural selection rules**.

Goal: Watch different species emerging and taking over because they are better fit for the environment!

![](https://raw.github.com/benji/darwins-dream-js/master/screenshot-1.png)

Uses JS/[Three.js](http://threejs.org/)/WebGL.

### Usage

  It's web based so check out the project and simply open index.html with Chrome or Firefox.

  Note: Internet Explorer is not supported as it doesn't support WebGL yet.

### The Method

* Decrease of the population: Aging and Death

* Increase of the population: Reproduction

* Environment: Time cycles; Produces food every cycle

### Rules of the environment

1) START: N Species, 1 cell organisms (everybody is pretty much equal at this stage)

2) GROWTH of a new cell at each cycle until maxCells is reached
   10% chances? of REPRODUCTION in area nearby (+/- 10 tiles?)
   1% chance of EVOLUTION/MUTATION(s) -> NEW SPECIES with 1 more cell allowed, direction of growth is random
   
3) NATURAL DEATH after 'maxCells' cycles (maxCells=10) 

4) SUN: every tile receive 1 unit of SUN/ENERGY divided as follows:
1/2 for the highest cells, then 1/4, 1/8, 1/16 etc.
A creature needs 1/2 unit of sun to survive


### TODO:

* Instead of creating random colors for new species, try to find a color that is the most discernible from the existing ones.

* Add more environment constraints

* Improve performance in order to operate on a large surface 

* Add genealogy tree

### Implementation details

Tree structure: World - Species - Creature - Cell

We now create/remove the all the three.js objects only when a rendering is required.
It will greatly improve performance when we don't really need frequent redering,
and thus we will spend most of the CPU time on the evolution algrithm itself.

