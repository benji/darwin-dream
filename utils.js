function absorb(o, options, defaults){
  for (var key in options) o[key]=options[key]
  for (var key in defaults) {
    if (!(key in o)) o[key]=defaults[key]
  }
}

// random number in [0; maxInt[
function rand(maxInt){
  return Math.floor(Math.random() * maxInt)
}

function randomTileInSquare(sqrLenTiles, excludes){
  if (typeof excludes == 'undefined') excludes=[]
  var possibilities = Math.pow(sqrLenTiles,2) - excludes.length
  var randIdx = rand(possibilities)

  var excludesIdx = []
  for (var i in excludes) {
    excludesIdx.push(posToIndex(excludes[i].x, excludes[i].y, sqrLenTiles))
  }
  excludesIdx.sort()

  for (var i in excludesIdx) {
    if (randIdx >= excludesIdx[i]) randIdx++;
  }
  
  return indexToPos(randIdx,sqrLenTiles)
}

function posToIndex(x,y,sqrLenTiles){
  return x+sqrLenTiles*y
}
function indexToPos(idx,sqrLenTiles){
  var x = idx % sqrLenTiles
  var y = (idx-x)/sqrLenTiles
  return { x:x, y:y }
}
