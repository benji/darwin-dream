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
  console.log("CYCLE "+cycle+" begins")
  
  // cleanup first
  var creatures = this.collectCreatures()
  for (var i in creatures){
    var c = creatures[i]
    if (c.cells.length >= c.species.maxCells) { c.die() }
  }
  CLOCKS.reset('growth')
  CLOCKS.reset('reproduction')
  var canReproduce = true
  creatures = this.collectCreatures()
  for (var i in creatures){
    var c = creatures[i]
    if (canReproduce && Math.random() < this.reproductionRate){
      var mutation = Math.random() < this.mutationRatePerReproduction
      CLOCKS.start('mutation')
      var species = mutation? c.species.mutate(): c.species
      CLOCKS.pause('mutation')
      CLOCKS.start('reproduction')
      var creature = species.reproduce(c)
      CLOCKS.pause('reproduction')
      canReproduce = (creature != null)
    }
    CLOCKS.start('growth')
    c.grow()
    CLOCKS.pause('growth')
  }
  CLOCKS.status('reproduction',"total reproduction")
  CLOCKS.status('mutation',"total mutation")
  CLOCKS.status('growth',"total growth")
  CLOCKS.status("exists_cell","exists_cell")
  //CLOCKS.status('randomTileInSquare','total randomTileInSquare')
  
  var remaining = WORLD.collectCreatures().length
  console.log("Cycle "+cycle+" complete with "+remaining+" creatures.")
  cycle++;
  return remaining;
}

//TODO make the world squared
World.prototype.freeGroundPos = function(){
return {x:rand(this.X),y:rand(this.Y),z:0}
  var excludes = WORLD.collectCreatures()
      CLOCKS.start('randomTileInSquare')
  var posXY = randomTileInSquare(this.X, excludes)
      CLOCKS.pause('randomTileInSquare')
  
  if (posXY==null) return null;
  else return {x:posXY.x, y:posXY.y, z:0}
}

// TODO
World.prototype.freeGroundPosAround = function(i,j){
  return this.freeGroundPos()
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
  CLOCKS.start("exists_cell")
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      var creature = species.creatures[j]
      for (var k in creature.cells){
        var c = creature.cells[k]
        if (c.x==coords.x && c.y==coords.y && c.z==coords.z) {
          CLOCKS.pause("exists_cell")
          return true
        }
      }
    }
  }
  CLOCKS.pause("exists_cell")
  return false
}
