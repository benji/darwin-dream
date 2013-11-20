function World(options){
  absorb(this, options,{
    X:100,
    Y:100
  })
  this.species = []
}

World.prototype.infest = function(nbSpecies, nbCreaturesPerSpecies, maxCellsPerCreature){
  var hue = 0, colorDelta = 1./nbSpecies
  for (var i=0; i<nbSpecies; i++){
    this.species.push( new Species(nbCreaturesPerSpecies, maxCellsPerCreature, getColorFromHue(hue)) )
    hue+=colorDelta
  }
}

World.prototype.freeGroundPos = function(){
  var pos
  // TODO better than that
  while(this.exists_cell(pos = {x:rand(this.X),y:rand(this.Y),z:0})) ;
  return pos;
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