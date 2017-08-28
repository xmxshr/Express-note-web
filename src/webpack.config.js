var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'js/app/index.js'),
  output: {
    path: path.join(__dirname, '../public/js'),
    filename: 'index.js'
  },
  // module:{
  //   rules:[
  //     {
  //       test: /\.less$/,
  //       exclude:['node_modules'],
  //       use:['style-loader','css-loader','less-loader']
  //     }
  //   ]
  // },
  resolve: {
    alias:{
      jquery: path.join(__dirname, 'js/lib/jquery-3.2.1.min.js'),
      mod: path.join(__dirname, 'js/mod')
      // app: path.join(__dirname + 'js/app')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]

}