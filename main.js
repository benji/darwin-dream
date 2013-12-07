var WORLD, CLOCKS = new Clocks()
var PLAY_INTERVAL_MS = 0, RENDER_NB_CYCLES = 1

var LOGGER = log4javascript.getLogger();
var consoleAppender = new log4javascript.BrowserConsoleAppender();
consoleAppender.setLayout( new log4javascript.PatternLayout("%-5p - %m") ); // %d{HH:mm:ss} 
consoleAppender.setThreshold(log4javascript.Level.WARN);
LOGGER.addAppender(consoleAppender)

window.onload = function() {
  WORLD = new World({
    X:20,
    Y:20,
    reproductionRate: 15./100,
    mutationRatePerReproduction: 3./100
  });
  createScene()
  WORLD.infest(3,5,10)
  render()
}

function next(){
  CLOCKS.start("stats")
  CLOCKS.reset('cycle')
  CLOCKS.start("cycle")
  LOGGER.info("=============")
  var remaining = WORLD.lifecycle()
  
  if (WORLD.cycle % RENDER_NB_CYCLES == 0 || remaining==0){
    CLOCKS.start("render")
    render()
    CLOCKS.status("render","rendering")
  }
  CLOCKS.status("cycle",'complete cycle')

  CLOCKS.pause("stats")
  var avg = Math.floor( CLOCKS.elapsed("stats")/WORLD.cycle )
  LOGGER.warn(avg+"ms/cycle")
  
  if (remaining==0) stop()
}

var runInterval;
function start(){
  LOGGER.info("Start")
  runInterval = setInterval(next, PLAY_INTERVAL_MS);
}
function stop(){
  LOGGER.info("Stop")
  clearInterval(runInterval)
}
