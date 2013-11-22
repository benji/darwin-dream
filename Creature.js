// http://stackoverflow.com/questions/387707/whats-the-best-way-to-define-a-class-in-javascript
function Creature(options){
  absorb(this, options)
  var cellOpts = {x:this.x,y:this.y,z:this.z}
  // console.log("Creating new creature: x="+cellOpts.x+" y="+cellOpts.y+" z="+cellOpts.z)
  cellOpts.creature = this
  this.cells = [new Cell(cellOpts)]
}

Creature.prototype.die = function(){
  console.log("Creature dies")
  var index = this.species.creatures.indexOf(this);
  if (index < 0) {
    console.log("ERROR: Creature not found!")
    return
  }
  for (var i in this.cells) this.cells[i].die()
  this.species.creatures.splice(index, 1);
}

Creature.prototype.grow = function(){
  this.cells.push(this.growNewCell(this.cells[this.cells.length-1], this.species.dna[0].probas))
}

Creature.prototype.growNewCell = function(c, growthProbas){
  var option = {creature:this, x:c.x, y:c.y, z:c.z}

  var canGrow = [
    !WORLD.exists_cell({x:c.x+1,y:c.y,z:c.z}),
    !WORLD.exists_cell({x:c.x-1,y:c.y,z:c.z}),
    !WORLD.exists_cell({x:c.x,y:c.y+1,z:c.z}),
    !WORLD.exists_cell({x:c.x,y:c.y-1,z:c.z}),
    !WORLD.exists_cell({x:c.x,y:c.y,z:c.z+1}),
    c.z > 0 && !WORLD.exists_cell({x:c.x,y:c.y,z:c.z-1})
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
    console.log("ERROR: CELL HAS NO ROOM TO GROW")
  }

  return new Cell(option)
}
