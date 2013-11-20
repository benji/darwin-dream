var WORLD;

window.onload = function() {
  WORLD = new World({X:100,Y:100});
  WORLD.infest(10,15,100)
  createScene()
  addLife()
  render()
}

function addLife(scene, world){
  WORLD.each_cell(function(c){
    SCENE.add(createCell(c.x,c.y,c.z,c.creature.species.color))
  })
}

function next(){
  //TODO
}