var WORLD;
var cycle = 0;
var reproductionRate = 10./100;
var mutationRatePerReproduction = 5/100;

window.onload = function() {
  createScene()
  WORLD = new World({X:20,Y:20});
  WORLD.infest(3,3,10)
  render()
  
}

function lifecycle(){
  // cleanup first
  var creatures = WORLD.collectCreatures()
  for (var i in creatures){
    var c = creatures[i]
    if (c.cells.length >= c.species.maxCells) c.die()
  }
  
  creatures = WORLD.collectCreatures()
  for (var i in creatures){
    var c = creatures[i]
    if (Math.random() < reproductionRate){
      var mutation = Math.random() < mutationRatePerReproduction
      var species = mutation? c.species.mutate(): c.species
      species.reproduce(c)
    }
    c.grow()
  }
  render()
  
  var remaining = WORLD.collectCreatures().length
  console.log("Cycle "+cycle+" complete with "+remaining+" creatures.")
  if (remaining==0) stop()
  
  cycle++;
}

var runInterval;
function start(){
  console.log("Start")
  runInterval = setInterval(lifecycle, 500);
}
function stop(){
  console.log("Stop")
  clearInterval(runInterval)
}