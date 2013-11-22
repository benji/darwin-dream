function Cell(options){
  absorb(this, options)
  // console.log("New cell at "+this.x+","+this.y+","+this.z)
  this.threeObject = createCube(this.x, this.y, this.z, this.creature.species.color)
  SCENE.add(this.threeObject)
  WORLD.cellSpaceRegistry[this.x][this.y].push(this.z)
}

Cell.prototype.die = function(){
  SCENE.remove(this.threeObject)
  var arr = WORLD.cellSpaceRegistry[this.x][this.y]
  arr.splice(arr.indexOf(this.z),1)
}
