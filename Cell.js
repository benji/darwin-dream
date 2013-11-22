function Cell(options){
  absorb(this, options)
  this.threeObject = createCube(this.x, this.y, this.z, this.creature.species.color)
  SCENE.add(this.threeObject)
  WORLD.cellSpaceRegistry[this.x][this.y]=this
}

Cell.prototype.die = function(){
  SCENE.remove(this.threeObject)
  WORLD.cellSpaceRegistry[this.x][this.y]=null
}
