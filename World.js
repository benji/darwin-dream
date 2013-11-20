function World(options){
  absorb(this, options,{
    X:100,
    Y:100
  })
  this.species = []
}

World.prototype.infest = function(nbSpecies, nbCreaturesPerSpecies, maxCellsPerCreature){
  for (var i=0; i<nbSpecies; i++){
    this.species.push( new Species(nbCreaturesPerSpecies, maxCellsPerCreature, randomColor()) )
  }
}

World.prototype.freeGroundPos = function(){
  var pos
  while(this.exists_cell(pos = {x:this.rand(this.X),y:this.rand(this.Y),z:0})) ;
  return pos;
}

// random number in [0; maxInt[
World.prototype.rand = function(maxInt){
  return Math.floor(Math.random() * maxInt)
}

World.prototype.each_cell = function(callback){
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      for (var k in species.creatures[j].cells){
        callback(species.creatures[j].cells[k])
      }
    }
  }
}

World.prototype.exists_cell = function(coords){
  this.each_cell(function(c){
    if (c.x==coords.x && c.y==coords.y && c.z==coords.z) return true 
  })
  return false
}