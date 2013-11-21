function Cell(options){
  absorb(this, options)
  this.threeObject = createCube(this.x, this.y, this.z, this.creature.species.color)
  SCENE.add(this.threeObject)
}

Cell.prototype.die = function(){
  SCENE.remove(this.threeObject)
}