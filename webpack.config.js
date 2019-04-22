const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin      = require('html-webpack-plugin');
var ExtractTextPlugin      = require('extract-text-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {

        inject   : true,
        hash     : true,
        // favicon  : "./favicon.ico",
        filename : 'view/' + name + '.html',
        template : './src/view/' + name + '.html',
        inject   : true,
        chunks   : ['common', name]
    }
}
//webpack. config
var webpack = require('webpack')
var config = {
  // mode : 'dev' === WEBPACK_ENV ? 'development' : 'production',
  entry: {
    'common' : ['./src/page/common/common.js'],
    'index'  : ['./src/page/index/index.js'],
    'login'  : ['./src/page/login/index.js'],
  },
  output: {
    filename   : 'js/[name].js',
    // path       : path.resolve(__dirname, 'dist')
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

// ERROR in chunk common [initial]
// commonStyle.css
// Cannot read property 'pop' of undefined 
// 为了解决以上错误，移去了chunks属性（原因不明）

          // chunks: "all",



          minChunks: 2,
          enforce: true
        },
        // 首先: 打包node_modules中的文件
      }
    }
  },
  resolve : {
    alias : {
      util            : __dirname + '/src/util',
      node_modules    : __dirname + '/node_modules',
      page            : __dirname + '/src/page',
      service         : __dirname + '/src/service',
      image           : __dirname + '/src/image',
    }
  },

  devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
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
            },
          },
          'css-loader',
        ], },
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
