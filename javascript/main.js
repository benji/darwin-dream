var WORLD, CLOCKS = new Clocks()
var PLAY_INTERVAL_MS = 0, RENDER_NB_CYCLES = 1

var LOGGER = log4javascript.getLogger();
var consoleAppender = new log4javascript.BrowserConsoleAppender();
consoleAppender.setLayout( new log4javascript.PatternLayout("%-5p - %m") ); // %d{HH:mm:ss} 
consoleAppender.setThreshold(log4javascript.Level.INFO);
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
  WORLD.assignColorToSpecies()
  render(WORLD)
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
    render(WORLD)
    CLOCKS.status("render","rendering")
  }
  CLOCKS.status("cycle",'complete cycle')

  updateSpeciesSummary()
  
  CLOCKS.pause("stats")
  var avg = Math.floor( CLOCKS.elapsed("stats")/WORLD.cycle )
  LOGGER.warn("Cycle "+WORLD.cycle+", "+avg+"ms/cycle")
  
  if (remaining==0) stop()
}

var runInterval, running = false;
function start(){
  if (!running){
    running = true
    LOGGER.info("Start")
    runInterval = setInterval(next, PLAY_INTERVAL_MS);
  }
}
function stop(){
  if (running){
    LOGGER.info("Stop")
    clearInterval(runInterval)
    running = false
  }
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

function save(){
}

function load(){
}

var LOCALSTORAGE_KEY = "darwin-dream-world-json"
function save(){
  var json = JSON.stringify(WORLD, function (key, value){
    if (key == "parent" || key == "cellsRegistry") return undefined;
    else return value;
  })
  localStorage.setItem(LOCALSTORAGE_KEY, json);
  LOGGER.info("WORLD saved")
}

function load(){
  var json = localStorage.getItem(LOCALSTORAGE_KEY)
  var worldData = JSON.parse(json)
  WORLD = new World(excludeFromHash(worldData,["species"]))

  for (var i in worldData.species){
    var sData = worldData.species[i]
    var s = new Species(excludeFromHash(sData,["creatures"]))
    WORLD.species.push(s)

    for (var j in sData.creatures){
      var cData = sData.creatures[j]
      var c = new Creature(excludeFromHash(cData,["cells"]))
      c.parent = s
      s.creatures.push(c)

      for (var k in cData.cells){
        var cellData = cData.cells[k]
        var cell = new Cell(cellData)
        cell.parent = c
        c.cells.push(cell)
      }
    }
  }
  WORLD.assignColorToSpecies()

  render(WORLD)
}




