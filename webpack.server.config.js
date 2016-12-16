var webpack = require("webpack");
var path = require("path");


module.exports = {
  entry: './server/app.js',
  output: {
    path: path.join(__dirname, '/dist'),  //设置打包后的js的输出位置
    filename: 'app.js',  //和入口文件的名字相同
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
    global: true,
    path: true,
  },
  externals: {
    'sequelize': "require('sequelize')",
    'ioredis': "require('ioredis')"
  },
  // 选择不同的加载器进行处理
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
  ],
}
