function Cell(options){
  absorb(this, options)
  this.threeObject = createCube(this.x, this.y, this.z, this.creature.species.color)
  SCENE.add(this.threeObject)
}

Cell.prototype.test = function(){
  this.threeObject.translateX(1)
}