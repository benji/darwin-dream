function Species(options){
  console.log("Creating new species")
  absorb(this,options,{maxCells:1,color:'black'})
  this.dna = []
  this.evolve()
  this.creatures = []
}

Species.prototype.createCreatures = function(qty){
  for (var i=0;i<qty;i++){
    var pos = WORLD.freeGroundPos()
    if (pos!=null){
      this.createCreature(pos)
    }else{
      console.log("No space for a new creature, birth is aborted.")
      break
    }
  }
}

Species.prototype.createCreature = function(pos){
  var creatureOpts = pos
  creatureOpts.species = this
  var creature = new Creature(creatureOpts)
  this.creatures.push( creature )
  return creature;
}

Species.prototype.reproduce = function(parent){
  var pos = WORLD.freeGroundPos()
  if (pos!=null){
    return this.createCreature(pos)
  }else{
    console.log("No space for a new creature, reproduction is aborted.")
    return null
  }
}

Species.prototype.evolve = function(){
  if (this.dna.length < this.maxCells) this.dna.push(new DNA())
}

Species.prototype.mutate = function(){
  console.log("A species is evolving...")
  var species = new Species({maxCells:this.maxCells,color:randomColor()})
  WORLD.species.push(species)
  return species
  //TODO evolve DNA
}

// probabilities for growing direction:
// x+1, x-1, y+1, y-1, z+1, z-1
function DNA(){
  this.probas = []
  for (var i=0;i<6;i++){
    this.probas[i] = Math.random();
  }
}
