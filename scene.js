var WORLD;

window.onload = function() {
  createScene()
  WORLD = new World({X:20,Y:20});
  WORLD.infest(3,5,10)
  render()
}

function next(){
  WORLD.each_creature(function(creature){
    creature.grow()
  })
  render()
  console.log("next complete")
}
