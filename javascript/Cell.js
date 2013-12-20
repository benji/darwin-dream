function Cell(options){
  absorb(this, options)
  this.energy = 0
  LOGGER.debug("New cell at "+this.x+","+this.y+","+this.z)
  WORLD.cellsRegistry.add(this)
}

Cell.prototype.die = function(){
  WORLD.cellsRegistry.remove(this)
}
