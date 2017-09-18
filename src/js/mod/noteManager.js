var Note = require('./note.js').Note
var Toast = require('./toast.js').Toast
var Event = require('./event.js')

var NoteManager= function(){

  function load(){
    $.get('/api/notes')
    .done(function(ret){
      if(ret.status === 0){
        $.each(ret.data,function(idx,note){
          new Note({
            id:note.id,
            context:note.text,
            username: note.username,
            createTime: note.createdAt
          })
        })
        Event.fire('waterfall')
      }else{
        Toast(ret.errorMsg)
      }
    })
    .fail(function(){
      Toast('网络异常')
    })
  }

  function add(){
    new Note()
  }

  return {
    add: add,
    load: load
  }
}()




module.exports.NoteManager = NoteManager
