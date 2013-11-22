var WORLD;
var cycle = 0;
var PLAY_INTERVAL_MS = 100
var CLOCKS = new Clocks()
var RENDER_NB_CYCLES = 1


//TODO debug/info/warning/error
var console = {};
console.log = function(){};

window.onload = function() {
  WORLD = new World({
    X:20,
    Y:20,
    reproductionRate: 15./100,
    mutationRatePerReproduction: 3./100
  });
  createScene()
  WORLD.infest(4,6,20)
  render()
}

function next(){
  console.log("=============")
  var remaining = WORLD.lifecycle()
  
  if (WORLD.cycle % RENDER_NB_CYCLES == 0 || remaining==0){
    CLOCKS.start("render")
    render()
    CLOCKS.status("render","rendering")
  }
  
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
