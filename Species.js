function Species(options){
  LOGGER.info("Creating new species")
  absorb(this,options,{maxCells:1,color:'black'})
  this.dna = []
  this.evolve()
  this.creatures = []
}

Species.prototype.createCreatures = function(qty){
  for (var i=0;i<qty;i++){
    if (this.reproduce() == null) break;
  }
}

Species.prototype.createCreature = function(opts){
  opts.species = this
  var creature = new Creature(opts)
  this.creatures.push( creature )
  return creature;
}

Species.prototype.reproduce = function(parent){
  var pos = WORLD.freeGroundPos()
  if (pos != null){
    return this.createCreature(pos)
  }else{
    LOGGER.debug("No space for a new creature, reproduction is aborted.")
    return null
  }
}

Species.prototype.evolve = function(){
  if (this.dna.length < this.maxCells) this.dna.push(new DNA())
}

Species.prototype.remove = function(creature){
  var index = this.creatures.indexOf(creature);
  if (index < 0) throw "ERROR: Creature not found!"

  this.creatures.splice(index, 1);

  if (this.creatures.length == 0) {
    WORLD.removeSpecies(this)
  }
}

Species.prototype.mutate = function(){
  LOGGER.info("A species is evolving...")
  var species = new Species({maxCells:this.maxCells,color:randomColor()})
  species.dna = this.dna.slice(0)
  species.dna[rand(6)] = new DNA() // the mutation
  WORLD.species.push(species)
  return species
}

// probabilities for growing direction:
// x+1, x-1, y+1, y-1, z+1, z-1
function DNA(){
  this.probas = []
  for (var i=0;i<6;i++){
    this.probas[i] = Math.random();
  }
}
