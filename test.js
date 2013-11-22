window.onload = function() {
  testUtils()
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

function testUtils(){
  testPosIdxConversion({x:0,y:0}, 0, 4)
  testPosIdxConversion({x:1,y:0}, 1, 4)
  testPosIdxConversion({x:0,y:1}, 4, 4)
  testPosIdxConversion({x:1,y:1}, 5, 4)
  testPosIdxConversion({x:1,y:3}, 13, 4)

  var pos = randomTileInSquare(4)
  assertTrue(pos.x>=0 && pos.x<4 && pos.y>=0 && pos.y<4)
}

