var WORLD;
var cycle = 0;
var PLAY_INTERVAL_MS = 100
var console = {};
console.log = function(){};

window.onload = function() {
  createScene()
  WORLD = new World({
    X:20,
    Y:20,
    reproductionRate: 40./100,
    mutationRatePerReproduction: 5./100
  });
  WORLD.infest(4,7,5)
  render()
}

function next(){
  var start1 = new Date()
  var remaining = WORLD.lifecycle()
  var elapsed1 = new Date() - start1
  console.log("lifecycle took: "+elapsed1+" ms")
  
  var start2 = new Date()
  render()
  var elapsed2 = new Date() - start2
  console.log("rendering took: "+elapsed2+" seconds")
  
  if (remaining==0) stop()
}

var runInterval;
function start(){
  console.log("Start")
  runInterval = setInterval(next, PLAY_INTERVAL_MS);
}
function stop(){
  console.log("Stop")
  clearInterval(runInterval)
}