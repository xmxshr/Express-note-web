require('less/index.less');

var Waterfall = require('../mod/waterfall.js')
var Event = require('../mod/event.js')
var NoteManager = require('../mod/noteManager.js').NoteManager


NoteManager.load()

$('.add-note').on('click', function(){
  NoteManager.add()
})

Event.on('waterfall', function(){
  Waterfall.init($('#content'))
})

