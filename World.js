function World(options){
  absorb(this, options,{
    X:100,
    Y:100,
    reproductionRadius: 10 // not really a radius
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