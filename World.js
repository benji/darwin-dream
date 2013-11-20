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
  while(this.exists_cell(pos = {x:rand(this.X),y:rand(this.Y),z:0})) ;
  return pos;
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