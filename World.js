function World(options){
  absorb(this, options,{
    X:100,
    Y:100,
    reproductionRadius: 10, // not really a radius
    reproductionRate: 10./100,
    mutationRatePerReproduction: 5./100
  })
  this.species = []
}

World.prototype.infest = function(nbSpecies, nbCreaturesPerSpecies, maxCellsPerCreature){
  var hue = 0, colorDelta = 1./nbSpecies
  for (var i=0; i<nbSpecies; i++){
    var species = new Species({maxCells:maxCellsPerCreature, color:getColorFromHue(hue)})
    this.species.push( species )
    species.createCreatures( nbCreaturesPerSpecies )
    hue+=colorDelta
  }
}



World.prototype.lifecycle = function(){
  // cleanup first
  var creatures = this.collectCreatures()
  for (var i in creatures){
    var c = creatures[i]
    if (c.cells.length >= c.species.maxCells) { c.die() }
  }
  
  creatures = this.collectCreatures()
  for (var i in creatures){
    var c = creatures[i]
    if (Math.random() < this.reproductionRate){
      var mutation = Math.random() < this.mutationRatePerReproduction
      var species = mutation? c.species.mutate(): c.species
      species.reproduce(c)
    }
    c.grow()
  }
  
  var remaining = WORLD.collectCreatures().length
  console.log("Cycle "+cycle+" complete with "+remaining+" creatures.")
  cycle++;
  return remaining;
}
World.prototype.freeGroundPos = function(){
  var pos
  // TODO better than that
  while(this.exists_cell(pos = {x:rand(this.X),y:rand(this.Y),z:0})) ;
  return pos;
}

// TODO
World.prototype.freeGroundPosAround = function(i,j){
  var pos
  while(this.exists_cell(pos = {x:rand(this.X),y:rand(this.Y),z:0})) ;
  return pos;
}

World.prototype.collectCreatures = function(){
  var creatures = []
  this.each_creature(function(c){ creatures.push(c) })
  return creatures
}

World.prototype.each_creature = function(callback){
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      callback(species.creatures[j])
    }
  }
}

World.prototype.each_cell = function(callback){
  this.each_creature(function(creature){
    for (var k in creature.cells){
      callback(creature.cells[k])
    }
  })
}

World.prototype.exists_cell = function(coords){
  this.each_cell(function(c){
    if (c.x==coords.x && c.y==coords.y && c.z==coords.z) return true 
  })
  return false
}