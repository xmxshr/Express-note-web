// var $ = require('../lib/jquery-3.2.1.min.js')
// var $ = require('jquery')

require('less/toast.less')


function toast(msg, time){
  this.msg = msg
  this.time = time || 1000
  this.createToast()
  this.showToast()
}

toast.prototype.createToast = function(){
  this.$node = $('<div class="toast">'+this.msg+'</div>')
  $('body').append(this.$node)
}

toast.prototype.showToast = function(){
  var _this = this
  this.$node.fadeIn(300,function(){
    setTimeout(function(){
      _this.$node.fadeOut(300,function(){
        _this.$node.remove()
      })
    },_this.time)
  })
}

var Toast = function(msg, time){
  return new toast(msg, time)
}

module.exports.Toast = Toast 