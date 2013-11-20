function Species(nbCreatures, maxCells, color){
  console.log("Creating new species")
  this.dna = []
  this.maxCells = maxCells
  this.color = color
  this.creatures = []
  for (var i=0;i<nbCreatures;i++){
    this.creatures.push( new Creature({species:this}) )
  }
}

Species.prototype.evolve = function(){
  if (this.dna.length < this.maxCells) this.dna.push(new DNA())
}

// probabilities for growing direction:
// x+1, x-1, y+1, y-1, z+1, z-1
function DNA(){
  this.probas = []
  var sum = 0;
  for (var i=0;i<6;i++){
    proba[i] = Math.random();
    sum += proba[i];
  }
  for (var i=0;i<6;i++){
    proba[i] /= sum;
  }
}
