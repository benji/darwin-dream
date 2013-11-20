
var WORLD = new World({X:100,Y:100});

window.onload = function() {
  WORLD.infest(3,15,100)
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 800, 600 );
  document.body.appendChild( renderer.domElement );
  var camera = createCamera()
  var scene = createScene()
  
  addLife(scene, WORLD)
  
  renderer.render( scene, camera )
}

function addLife(scene, world){
  WORLD.each_cell(function(c){
    scene.add(createCell(c.x,c.y,c.z,c.creature.species.color))
  })
}

function createLine(x1,y1,z1,x2,y2,z2,color){
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(x1,y1,z1));
  geometry.vertices.push(new THREE.Vector3(x2,y2,z2));
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color }))
}

function addGrid(scene, size, color){
  for (var i=0;i<size;i++){
    scene.add(createLine(i,0,0,i,100,0,color));
    scene.add(createLine(0,i,0,100,i,0,color));
  }
}

function createCell(i,j,k,color){
  var geometry = new THREE.CubeGeometry( 1, 1, 1 );
  var material = new THREE.MeshLambertMaterial( { color: color } );
  var mesh = new THREE.Mesh( geometry, material );
  mesh.translateX(i)
  mesh.translateY(j)
  mesh.translateZ(k)
  return mesh;
}

function createCamera(){
  var camera = new THREE.PerspectiveCamera(
    35,             // Field of view
    800 / 600,      // Aspect ratio
    0.1,            // Near plane
    10000           // Far plane
  );
  camera.position.set( 90, -80, 60 );
  camera.up.set( 0, 0, 1 );
  camera.lookAt( new THREE.Vector3(25,50,0) );
  return camera;
}

function createScene(){
  var scene = new THREE.Scene();
  
  var light = new THREE.PointLight( 0xFFFF00 );
  light.position.set( 10, 10, 10 );
  scene.add( light );

  // axis
  scene.add(createLine(0, 0, 0, 1000, 0, 0, 0xff0000));
  scene.add(createLine(0, 0, 0, 0, 1000, 0, 0x00ff00));
  scene.add(createLine(0, 0, 0, 0, 0, 1000, 0x0000ff));
  
  addGrid(scene, 100, 0x000000)
  return scene
}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
