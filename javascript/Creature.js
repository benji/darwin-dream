// http://stackoverflow.com/questions/387707/whats-the-best-way-to-define-a-class-in-javascript
function Creature(options){
  absorb(this, options)
  this.creationCycle = WORLD.cycle
  var cellOpts = {x:this.x,y:this.y,z:this.z}
  LOGGER.debug("Creating new creature: x="+cellOpts.x+" y="+cellOpts.y+" z="+cellOpts.z)
  cellOpts.parent = this
  this.cells = [new Cell(cellOpts)]
}

Creature.prototype.die = function(){
  this.parent.remove(this)
  for (var i in this.cells) this.cells[i].die()
}

Creature.prototype.grow = function(){
  var idx = this.cells.length-1
  var cell = this.growNewCell(this.cells[idx], this.parent.getDna(idx).probas)
  if (cell!=null) this.cells.push(cell)
}

Creature.prototype.hasEnoughEnergy = function(){
  var totalEnergy = 0
  for (var i in this.cells) {
    totalEnergy += this.cells[i].energy
  }
  return totalEnergy - this.cells.length*WORLD.requiredCellEnergy > 0
}

Creature.prototype.growNewCell = function(c, growthProbas){
  var option = {parent:this, x:c.x, y:c.y, z:c.z}

  var canGrow = [
    c.x < WORLD.X-1 && !WORLD.exists_cell({x:c.x+1,y:c.y,z:c.z}),
    c.x > 0         && !WORLD.exists_cell({x:c.x-1,y:c.y,z:c.z}),
    c.y < WORLD.Y-1 && !WORLD.exists_cell({x:c.x,y:c.y+1,z:c.z}),
    c.y > 0         && !WORLD.exists_cell({x:c.x,y:c.y-1,z:c.z}),
                       !WORLD.exists_cell({x:c.x,y:c.y,z:c.z+1}),
    c.z > 0         && !WORLD.exists_cell({x:c.x,y:c.y,z:c.z-1})
  ]

  var sumProbasCanGrow = 0
  for (var i=0;i<6;i++) sumProbasCanGrow += canGrow[i]?growthProbas[i]:0;

  var p = Math.random()*sumProbasCanGrow

  var sumPrevProbas = 0;
  if      (canGrow[0] && p<(sumPrevProbas+=growthProbas[0])) option.x+=1
  else if (canGrow[1] && p<(sumPrevProbas+=growthProbas[1])) option.x-=1
  else if (canGrow[2] && p<(sumPrevProbas+=growthProbas[2])) option.y+=1
  else if (canGrow[3] && p<(sumPrevProbas+=growthProbas[3])) option.y-=1
  else if (canGrow[4] && p<(sumPrevProbas+=growthProbas[4])) option.z+=1
  else if (canGrow[5])                                       option.z-=1
  else {
    LOGGER.debug("ERRORCell has no room to grow")
    return null
  }

  return new Cell(option)
}
