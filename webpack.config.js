const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        inject   : true,
        hash     : true,
        template : 'src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        chunks   : ['common', name]
    }
}
//webpack. config
var webpack = require('webpack')
var config = {
  entry: {
    'common1': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    filename: 'js/[name].js',
    publicPath : '/dist',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    'jquery' : 'window.jQuery'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  },
    plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),

  ],


    module: {
        rules: [
          { test: /\.css$/, use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ], },
          { test: /\.ts$/, use: 'ts-loader' },
          { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader:'url-loader',
                options: {
                    name: '[path][name].[ext]',
                    limit: 8192
                    //限制文件大小
                    
                }
            }] },
        ]
      },

};

module.exports = config;