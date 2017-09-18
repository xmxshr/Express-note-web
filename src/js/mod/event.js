var Event = (function(){
  var events = {}
  function on(evt, handle){
    events[evt] = events[evt] || []
    events[evt].push({
      handle: handle
    })
  }
  function fire(evt, args){
    if(!events[evt]){
      return
    }
    for(var i=0; i<events[evt].length; i++){
      events[evt][i].handle(args)
    }
  }
  function off(evt){
    delete events[evt]
  }
  return {
    on: on,
    fire: fire,
    off: off
  }
})()

module.exports = Event