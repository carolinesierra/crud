var path = require('path');

// configuraciones requeridas para utilizar webpack
module.exports = {
  entry: './src/app/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'src/public'),
    filename: 'bundle.js'
  },
  module: {
  	rules: [
  		{
  			use:'babel-loader',
  			test:/\.js$/,
  			exclude: /node_modules/
  		}

  	]
  }
 
}