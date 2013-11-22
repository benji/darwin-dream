var WORLD;
var cycle = 0;
var PLAY_INTERVAL_MS = 100
var CLOCKS = new Clocks()
var console = {};
console.log = function(){};


window.onload = function() {
  WORLD = new World({
    X:12,
    Y:12,
    reproductionRate: 40./100,
    mutationRatePerReproduction: 5./100
  });
  createScene()
  WORLD.infest(2,4,10)
  render()
}

function next(){
  console.log("=============")
  var remaining = WORLD.lifecycle()
  
  CLOCKS.start("render")
  render()
  CLOCKS.status("render","rendering")
  
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
