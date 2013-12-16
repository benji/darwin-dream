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
  WORLD.infest(3,5,30)
  render()
  updateSpeciesSummary()
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

  updateSpeciesSummary()
  
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

function updateSpeciesSummary(){
  var container = $("#species")
  container.empty()
  var sortedSpecies = WORLD.species.slice(0).sort(function(s1,s2){return s2.creatures.length-s1.creatures.length})
  for (var i in sortedSpecies){
    var species = sortedSpecies[i]
    var c = species.color
    var cssColor = "rgb("+Math.floor(c.r*255)+","+Math.floor(c.g*255)+","+Math.floor(c.b*255)+")"
    container.append("<li><div class=\"species-color\" style=\"background-color:"+cssColor+"\">&nbsp;</div><span class=\"species-name\">Species "+species.id+"</span><span class=\"species-creatures\">"+species.creatures.length+"</span></li>")
  }
}
