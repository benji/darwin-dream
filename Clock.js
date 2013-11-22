// ============ CLOCKS ============
function Clocks(){
  this.timers = {}
}

Clocks.prototype.start = function(id){
  if (this.timers[id] == null) this.timers[id] = new Timer()
  this.timers[id].start()
}

Clocks.prototype.reset = function(id){ if (this.timers[id]) this.timers[id].reset() }
Clocks.prototype.pause = function(id){ this.timers[id].pause() }
Clocks.prototype.status = function(id, msg){ this.timers[id].status(msg) }

// ============ TIMER ============
function Timer(){
  this.reset()
}

Timer.prototype.start = function(){
  this.lastTime = new Date()
}

Timer.prototype.pause = function(){
  var now = new Date()
  this.elapsed += now - this.lastTime
  this.lastTime = null
}

Timer.prototype.reset = function(){
  this.elapsed = 0
  this.lastTime = null
}

Timer.prototype.status = function(msg){
  var now = new Date()
  var elapsed = this.elapsed
  if (this.lastTime!=null) elapsed += (now-this.lastTime)
  console.log("CLOCK: "+elapsed+"ms : "+msg)
}