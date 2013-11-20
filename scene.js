var WORLD;

window.onload = function() {
  createScene()
  WORLD = new World({X:100,Y:100});
  WORLD.infest(10,15,100)
  render()
}

function next(){
  WORLD.each_creature(function(creature){
    creature.grow()
  })
  render()
  console.log("next complete")
}