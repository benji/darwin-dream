function World(options){
  absorb(this, options,{
    X:100,
    Y:100,
    reproductionRadius: 10, // not really a radius
    reproductionRate: 10./100,
    mutationRatePerReproduction: 5./100,
    requiredCellEnergy: 1./4
  })
  
  this.cellsRegistry = new CellsRegistry({ X: this.X, Y: this.Y})

  this.species = []
  this.cycle=0
}

World.prototype.infest = function(nbSpecies, nbCreaturesPerSpecies, maxCellsPerCreature){
  for (var i=0; i<nbSpecies; i++){
    var species = new Species({maxCells:maxCellsPerCreature})
    this.species.push( species )
    species.createCreatures( nbCreaturesPerSpecies )
  }
}

World.prototype.assignColorToSpecies = function(){
  var hue = 0, colorDelta = 1./this.species.length
  for (var i in this.species){
    this.species[i].color = getColorFromHue(hue)
    hue+=colorDelta
  }
}



World.prototype.lifecycle = function(){
  LOGGER.info("CYCLE "+this.cycle+" begins")
  
  // sunshine
  for (var i in creatures){
    var c = creatures[i]
    for (var j in c.cells) c.cells[j].energy = 0
  }
  for (var i=0;i<this.X;i++){
    for (var j=0;j<this.Y;j++){
      var cells = this.cellsRegistry.getCellsXY({x:i,y:j})
      for (var k in cells){
        // each cell takes up half of the energy it receives
        cells[k].energy = 1./Math.pow(2,k)
      }
    }
  }

  // death
  var creatures = this.collectCreatures()
  var nbDeadCreatures = 0
  for (var i in creatures){
    var c = creatures[i]
    if (this.cycle - c.creationCycle >= c.parent.maxCells || !c.hasEnoughEnergy()) {
      c.die()
      nbDeadCreatures++;
    }
  }

  LOGGER.info(nbDeadCreatures+" creatures died")
  CLOCKS.reset('growth')
  CLOCKS.reset('reproduction')
  var canReproduce = true, nbNewCreatures = 0
  creatures = shuffle(this.collectCreatures())
  for (var i in creatures){
    var c = creatures[i]
    if (canReproduce && Math.random() < this.reproductionRate){
      var mutation = Math.random() < this.mutationRatePerReproduction
      var species = mutation? c.parent.mutate(): c.parent
      
      CLOCKS.start('reproduction')
      var creature = species.reproduce(c)
      CLOCKS.pause('reproduction')
      
      if (creature != null) {
        nbNewCreatures++;
      }
      else canReproduce = false
    }
    CLOCKS.start('growth')
    c.grow()
    CLOCKS.pause('growth')
  }
  CLOCKS.status('reproduction',"total reproduction")
  CLOCKS.status('growth',"total growth")
  
  var remaining = WORLD.collectCreatures().length
  LOGGER.info("Cycle "+this.cycle+" complete with "+remaining+" creatures ("+nbNewCreatures+" new)")
  LOGGER.info("Remaining spots: "+this.countFreeGroundPos())
  this.cycle++;
  return remaining;
}

//TODO make the world squared
World.prototype.freeGroundPos = function(){
  var posXY = randomTileInSquare(this.X, WORLD.cellsRegistry.getGroundExcludedIdx())

  if (posXY==null) {
    return null;
  }
  return {x:posXY.x, y:posXY.y, z:0}
}

// TODO
World.prototype.freeGroundPosAround = function(i,j){
  return this.freeGroundPos()
}

World.prototype.collectCreatures = function(){
  var creatures = []
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      creatures.push(species.creatures[j])
    }
  }
  return creatures
}

World.prototype.removeSpecies = function(species){
  LOGGER.info("A species goes extinct!")
  var index = this.species.indexOf(species);
  if (index < 0) {
    throw "ERROR: Species not found!"
  }
  this.species.splice(index, 1)
}

World.prototype.countCells = function(){
  var count=0
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      count += species.creatures[j].cells.length
    }
  }
  return count
}

World.prototype.exists_cell = function(coords){
  return this.cellsRegistry.existsXYZ(coords)
}

World.prototype.countFreeGroundPos = function(){
  var count=this.X*this.Y
  for (var i=0;i<this.X;i++){
    for (var j=0;j<this.Y;j++){
      if (this.exists_cell({x:i, y:j, z:0})) count--
    }
  }
  return count
}

World.prototype.findCreatureAtPos = function(pos){
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      var creature = species.creatures[j]
      for (var k in creature.cells){
        var cell = creature.cells[k]
        if (cell.x == pos.x && cell.y == pos.y && cell.z == pos.z) return creature
      }      
    }
  }
}
