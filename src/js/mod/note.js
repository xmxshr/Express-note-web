require('less/note.less')

var Event = require('./event.js')
var Toast = require('./toast.js').Toast

function Note(opt){
  this.initNote(opt)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}

Note.prototype = {
  colors: [
    // ['#ea9b35','#efb04e'], // headColor, containerColor
    // ['#dd598b','#e672a2'],
    // ['#eee34b','#f2eb67'],
    // ['#c24226','#d15a39'],
    // ['#c1c341','#d0d25c'],
    // ['#3f78c3','#5591d2'],

    ['#bbdbaa','#c7e2b9'],
    ['#a2dbec','#b3e3f1'],
    ['#c8b4d7','#cbbcd9'],
    ['#e4da8f','#e6e4ab'],
    ['#a7d3b0','#badec4'],
    ['#ebb1c0','#f2c0cc']
  ],
  defaultNote:{
    id:'',
    $ct: $('#content'),
    context: '在这里输入内容喔~',
    username: '',
    createTime: ''
  },
  initNote: function(opt){
    this.opt = $.extend({},this.defaultNote,opt||{})
    if(this.opt.id){
      this.id = this.opt.id
    }
  },
  createNote: function(){
    var html = '<div class="note">'
    html += '<div class="note-head"><span class="delete">&times;</span></div>'
    html += '<div class="note-ct" contenteditable="true"></div>'
    html += '<div class="note-info"><div class="note-name"></div><div class="note-time"></div></div>'
    html += '</div>'
    this.$note = $(html)
    this.$note.find('.note-ct').html(this.opt.context)
    this.$note.find('.note-name').html(this.opt.username)
    this.$note.find('.note-time').html(this.opt.createTime.slice(0,10))

    this.opt.$ct.append(this.$note)
    if(!this.id){
      this.$note.css('color', '#fff')
    }
  },
  setStyle: function(){
    var color = this.colors[Math.floor(Math.random()*6)]
    var deg = Math.floor(Math.random()*8-4)
    this.$note.find('.note-head').css('background', color[0])
    this.$note.find('.note-ct').css('background', color[1])
    this.$note.find('.note-info').css('background', color[1])
    this.$note.css('transform', 'rotate('+deg+'deg)')
  },
  setLayout: function(){
    // var _this = this 
    // if(_this.clock){
    //   clearTimeout(_this.clock)
    // }
    // _this.clock = setTimeout(function(){
      Event.fire('waterfall')
    // },100)
  },
  bindEvent:function(){
    var _this = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.note-head .delete')

    $delete.on('click', function(){
      _this.delete()
    })

    //设置contenteditable
    $noteCt.on('focus', function(){
      if($noteCt.html() === '在这里输入内容喔~'){
        $noteCt.html('')
      }
      $noteCt.data('base', $noteCt.html())
    }).on('blur paste', function(){
      if($noteCt.data('base') !== $noteCt.html()){
        $noteCt.data('base', $noteCt.html())
        _this.setLayout()
        if(_this.id){
          _this.edit($noteCt.html())
        }else{
          _this.add($noteCt.html())
        }
      }
    })

    //设置移动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left //鼠标到note左边框的距离
      var evtY = e.pageY - $note.offset().top
      $note.addClass('draggable').data('evtPos', {x:evtX,y:evtY})
    }).on('mouseup', function(){
      $note.removeClass('draggable').removeData('evtPos')
    })

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,
        left: e.pageX - $('.draggable').data('evtPos').x
      })
    })
    
  },
  add: function(msg){
    var _this = this
    $.post('/api/notes/add', {note:msg})
      .done(function(ret){
        if(ret.status === 0){
          Toast('添加成功')
          _this.$note.css('color', '#000')
          console.log(ret.data)
          _this.$note.find('.note-name').html(ret.data.username)
          _this.$note.find('.note-time').html(ret.data.createTime.slice(0,10))
        }else{
          _this.$note.remove()
          Event.fire('waterfall')
          Toast(ret.errorMsg)
        }
      })
  },
  edit: function(msg){
    var _this = this
    $.post('/api/notes/edit', {
      id: this.id,
      note: msg
      }).done(function(ret){
        if(ret.status === 0){
          Toast('编辑成功')
        }else{
          Toast(ret.errorMsg)
        }
      })
  },
  delete: function(){
    var _this = this
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Toast('删除成功')
          _this.$note.remove()
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg)
        }
      })
  }
}


module.exports.Note = Note