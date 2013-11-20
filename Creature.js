// http://stackoverflow.com/questions/387707/whats-the-best-way-to-define-a-class-in-javascript
function Creature(options){
  console.log("Creating new creature with "+options)
  absorb(this, options)
  this.nbCells = 1
  var cellOpts = WORLD.freeGroundPos()
  cellOpts['creature'] = this
  this.cells = [new Cell(cellOpts)]
}

Creature.prototype.grow = function(){
  
}
