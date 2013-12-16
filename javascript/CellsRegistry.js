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
  this.registryXYZ[cell.x][cell.y][cell.z] = cell
  if (cell.z == 0) this.registryXY0[cell.x][cell.y] = cell
}

CellsRegistry.prototype.remove = function(cell){
  this.registryXYZ[cell.x][cell.y][cell.z] = null
  if (cell.z == 0) this.registryXY0[cell.x][cell.y] = null
}

CellsRegistry.prototype.exists = function(v){
  return v != null && typeof v !== "undefined"
}

// check 3D position
CellsRegistry.prototype.existsXYZ = function(pos){
  return this.exists(this.registryXYZ[pos.x][pos.y][pos.z])
}

// check ground position
CellsRegistry.prototype.existsXY0 = function(pos){
  return this.exists(this.registryXYZ[pos.x][pos.y])
}

// cells higher to lower
CellsRegistry.prototype.getCellsXY = function(pos){
  var existing = []
  var arr = this.registryXYZ[pos.x][pos.y]
  for (var i in arr){
    if (this.exists(arr[i])) existing.push(arr[i])
  }
  return existing.sort(function(c1,c2){return c2.z-c1.z;})
}

CellsRegistry.prototype.countTakenGroundTiles = function(){
  var count = 0
  for (var i=0;i<this.X;i++) {
    for (var j=0;j<this.Y;j++) {
      if (this.exists(this.registryXY0[i][j])) count++;
    }
  }
  return count
}

CellsRegistry.prototype.getGroundExcludedIdx = function(){
  var exludedIdx = []
  for (var i=0;i<this.X;i++) {
    for (var j=0;j<this.Y;j++) {
      if (this.exists(this.registryXY0[i][j])) {
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
        if (this.exists(this.registryXYZ[i][j][k])) {
          count++;
        }
      }
    }
  }
  return count
}

