function Species(options){
  console.log("Creating new species")
  absorb(this,options,{maxCells:1,color:'black'})
  this.dna = []
  this.evolve()
  this.creatures = []
}

Species.prototype.createCreatures = function(qty){
  for (var i=0;i<qty;i++){
    this.creatures.push( new Creature({species:this}) )
  }
}

Species.prototype.reproduce = function(parent){
  this.creatures.push( new Creature({species:this}) )
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
