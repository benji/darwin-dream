window.onload = function() {
  //testCreateWorld()
  testPosConversion()
  testRandomTileInSquare()
  testShuffleArray()
}

function assertTrue(b){
  if (b) console.log("PASSED")
  else throw("FAILED")
}

function assertEquals(a, b, equalsFunc){
  if (typeof equalsFunc == 'undefined'){
    equalsFunc = function(a,b){return a==b;}
  }
  assertTrue(equalsFunc(a,b))
}

var posEquals = function(a,b){return a.x==b.x && a.y==b.y;}

function testPosIdxConversion(pos, idx, len){
  assertEquals(idx, posToIndex(pos.x,pos.y,len))
  assertEquals(pos, indexToPos(idx,4), posEquals)
}

function testPosConversion(){
  testPosIdxConversion({x:0,y:0}, 0, 4)
  testPosIdxConversion({x:1,y:0}, 1, 4)
  testPosIdxConversion({x:0,y:1}, 4, 4)
  testPosIdxConversion({x:1,y:1}, 5, 4)
  testPosIdxConversion({x:1,y:3}, 13, 4)

  var pos = randomTileInSquare(4)
  assertTrue(pos.x>=0 && pos.x<4 && pos.y>=0 && pos.y<4)
}

function testRandomTileInSquare(){
  var len = 10
  var excludedIdx = []
  for (var i=0;i<100;i++){
    var pos = randomTileInSquare(len, excludedIdx)

    assertTrue(pos!=null)
    assertTrue(pos.x>=0 && pos.x<len && pos.y>=0 && pos.y<len)
    var idx=posToIndex(pos.x,pos.y,len)

    assertTrue(excludedIdx.indexOf(idx) == -1)
    excludedIdx.push(idx)
  }
}

function testShuffleArray(){
  var arr = [1,2,3,4,5]
  for (var i=0;i<100;i++){
    var sarr = shuffle(arr)
    assertEquals(arr.length, sarr.length)
    for (var j in arr) assertTrue(sarr.indexOf(arr[j]) > -1)
  }
}

var WORLD
function testCreateWorld(){
  WORLD = new World({
    X:20,
    Y:20,
    reproductionRate: 15./100,
    mutationRatePerReproduction: 3./100
  })
  WORLD.infest(1,1,10)
  var s=WORLD.species[0]
  var c=s.creatures[0]
  var i=100
  while(i-->0){
    console.log( WORLD.collectCreatures().length )
    console.log( WORLD.cellsRegistry.countCells() )
    console.log( WORLD.cellsRegistry.countTakenGroundTiles() )
     s.reproduce(c)
    console.log("----")
  }
}


