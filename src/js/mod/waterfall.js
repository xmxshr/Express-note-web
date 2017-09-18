var Waterfall = (function(){
  var $ct 
  var $items

  function render($c){
    $ct = $c
    $items = $ct.children()

    var nodeWidth = $items.outerWidth(true),
        colNum = parseInt($(window).width()/nodeWidth),
        colSumHeight = []

    for(var i=0; i<colNum; i++){
      colSumHeight.push(0)
    }

    $items.each(function(){
      var $item = $(this)
      var idx = 0,
          minHeight = colSumHeight[0]
      for(var i=0;i<colSumHeight.length;i++){
        if(minHeight>colSumHeight[i]){
          minHeight = colSumHeight[i]
          idx = i
        }
      }
      $item.css({
        left: idx*nodeWidth,
        top: colSumHeight[idx]
      })
      colSumHeight[idx] += $item.outerHeight(true)
    })
  }

  $(window).resize(function(){
    render($ct)
  })

  return {
    init: render
  }
})()

module.exports = Waterfall