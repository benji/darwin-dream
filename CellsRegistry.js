function CellsRegistry(options){
  absorb(this, options)

  // cache for existsXYZ
  this.registryXYZ = []
  // cache for existsXY0
  this.registryXY0 = []

  // initialize
  for (var i=0;i<this.X;i++) {
    this.registryXYZ[i] = []
    this.registryXY0[i] = []
    for (var j=0;j<this.Y;j++) {
      this.registryXYZ[i][j] = []
    }
  }
}

CellsRegistry.prototype.add = function(cell){
  this.registryXYZ[cell.x][cell.y][cell.z] = 1
  if (cell.z == 0) this.registryXY0[cell.x][cell.y] = 1
}

CellsRegistry.prototype.remove = function(cell){
  this.registryXYZ[cell.x][cell.y][cell.z] = null
  if (cell.z == 0) this.registryXY0[cell.x][cell.y] = null
}
// check 3D position
CellsRegistry.prototype.existsXYZ = function(pos){
  return this.registryXYZ[pos.x][pos.y][pos.z] == 1
}

// check ground position
CellsRegistry.prototype.existsXY0 = function(pos){
  return this.registryXYZ[pos.x][pos.y] == 1
}

CellsRegistry.prototype.countTakenGroundTiles = function(){
  var count = 0
  for (var i=0;i<this.X;i++) {
    for (var j=0;j<this.Y;j++) {
      if (this.registryXY0[i][j] == 1) count++;
    }
  }
  return count
}

CellsRegistry.prototype.getGroundExcludedIdx = function(){
  var exludedIdx = []
  for (var i=0;i<this.X;i++) {
    for (var j=0;j<this.Y;j++) {
      if (this.registryXY0[i][j] == 1) {
        exludedIdx.push(posToIndex(i, j, this.X))
      }
    }
  }
  return exludedIdx
}


CellsRegistry.prototype.countCells = function(){
  var count = 0
  for (var i=0;i<this.X;i++) {
    for (var j=0;j<this.Y;j++) {
      for (var k=0;k<100;k++) { // TODO
        if (this.registryXYZ[i][j][k] == 1) {
          count++;
        }
      }
    }
  }
  return count
}

