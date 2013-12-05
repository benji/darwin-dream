function World(options){
  absorb(this, options,{
    X:100,
    Y:100,
    reproductionRadius: 10, // not really a radius
    reproductionRate: 10./100,
    mutationRatePerReproduction: 5./100
  })
  
  this.cellSpaceRegistry = []
  for (var i=0;i<this.X;i++) {
    this.cellSpaceRegistry[i] = []
    for (var j=0;j<this.Y;j++) this.cellSpaceRegistry[i][j]=[]
  }

  this.species = []
  this.cycle=0
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
  console.log("CYCLE "+this.cycle+" begins")
  
  // cleanup first
  var creatures = this.collectCreatures()
  var nbDeadCreatures = 0
  for (var i in creatures){
    var c = creatures[i]
    if (this.cycle - c.creationCycle >= c.species.maxCells) {
      c.die()
      nbDeadCreatures++;
      if (c.species.creatures.length == 0) {
        var index = this.species.indexOf(c.species);
        if (index < 0) {
          console.log("ERROR: Species not found!")
        }else{
          console.log("A species goes extinct")
          this.species.splice(c.species, 1)
        }
      }
    }
  }

  console.log(nbDeadCreatures+" creatures died")
  CLOCKS.reset('growth')
  CLOCKS.reset('reproduction')
  var canReproduce = true, nbNewCreatures = 0
  creatures = shuffle(this.collectCreatures())
  for (var i in creatures){
    var c = creatures[i]
    if (canReproduce && Math.random() < this.reproductionRate){
      var mutation = false;//Math.random() < this.mutationRatePerReproduction
      var species = mutation? c.species.mutate(): c.species
      
      CLOCKS.start('reproduction')
      var creature = species.reproduce(c)
      CLOCKS.pause('reproduction')
      
      if (creature != null) nbNewCreatures++;
      else canReproduce = false
    }
    CLOCKS.start('growth')
    c.grow()
    CLOCKS.pause('growth')
  }
  CLOCKS.status('reproduction',"total reproduction")
  CLOCKS.status('growth',"total growth")
  
  var remaining = WORLD.collectCreatures().length
  console.log("Cycle "+this.cycle+" complete with "+remaining+" creatures ("+nbNewCreatures+" new)")
  console.log("Remaining spots: "+this.countFreeGroundPos())
  this.cycle++;
  return remaining;
}

//TODO make the world squared
World.prototype.freeGroundPos = function(){
  var excludes = WORLD.collectCreatures()

  var posXY = randomTileInSquare(this.X, excludes)

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

World.prototype.exists_cell = function(coords){
  return this.cellSpaceRegistry[coords.x][coords.y].indexOf(coords.z) >= 0
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
        if (cell.x == pos.x && cell.y == pos.y && cell.z == pos.z) return cell.creature
      }      
    }
  }
}

World.prototype.detectFlyingCreatures = function(){
  for (var i in this.species){
    var species = this.species[i]
    for (var j in species.creatures){
      var creature = species.creatures[j]
      if (creature.z>0) return creature
    }
  }
}

World.prototype.detectDuplicateCells = function(){
  var registry = []
 
  for (var i in this.species){
    var species = this.species[i]
    if (typeof registry[i] == "undefined") registry[i]=[]
    for (var j in species.creatures){
      var creature = species.creatures[j]
      if (typeof registry[i][j] == "undefined") registry[i][j] = []
      for (var k in creature.cells){
        if (registry[i][j].indexOf(k) > -1){
          console.log("Duplicate found at "+i+","+j+","+k)
        }
        registry[i][j].push(k)
      }
    }
  }
  return registry
}
