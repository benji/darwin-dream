// http://stackoverflow.com/questions/387707/whats-the-best-way-to-define-a-class-in-javascript
function Creature(options){
  absorb(this, options)
  this.nbCells = 1
  var cellOpts = WORLD.freeGroundPos()
  cellOpts['creature'] = this
  this.cells = [new Cell(cellOpts)]
}

Creature.prototype.grow = function(){
  this.cells.push(this.growNewCell(this.cells[this.cells.length-1], this.species.dna[0].probas))
}

// TODO : first list the available spots first to avoid collisions
Creature.prototype.growNewCell = function(rootCell, growthProbas){
  var option = {creature:this, x:rootCell.x, y:rootCell.y, z:rootCell.z}
  var p = Math.random()

  if (p<growthProbas[0]) option.x+=1
  else if (p<growthProbas[1]) option.x-=1
  else if (p<growthProbas[2]) option.y+=1
  else if (p<growthProbas[3]) option.y-=1
  else if (p<growthProbas[4]) option.z+=1
  else option.z-=1
  return new Cell(option)
}
