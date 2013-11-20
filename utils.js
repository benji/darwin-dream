function absorb(o, options, defaults){
  for (var key in options) o[key]=options[key]
  for (var key in defaults) {
    if (!(key in o)) o[key]=defaults[key]
  }
}