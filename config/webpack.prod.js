const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  //入口
  entry: "./src/main.js",
  //输出
  output: {
    //所有文件的输出路径
    //__dirname 表示当前文件的文件夹目录
    path: path.resolve(__dirname, '../dist'),
    //入口文件保存地址
    filename: "static/js/main.js",
    // 自动清空上一次打包内容 原理: 在打包之前将path整个目录清空
    clean: true
  },
  //加载器
  module: {
    rules: [
      //loader配置
      //css配置
      {
        test: /\.css$/i, //只检测.css文件
        use: [
          //执行顺序,从右到左(从上到下)
          MiniCssExtractPlugin.loader, //将js中的css通过创建style标签添加到html文件中生效
          "css-loader", //将css资源编译成commonjs的模块到js中
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      //images配置
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            //小于10kb的图片转base64
            //减少请求数量,但体积会变大
            maxSize: 10 * 1024
          }
        },
        generator: {
          //输出图片名称 [hash:10]前十位hash值 [ext]扩展名 [query]携带参数
          filename: "static/images/[hash:10][ext][query]"
        }
      },
      //media配置
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource",
        generator: {
          //输出图片名称 [hash:10]前十位hash值 [ext]扩展名 [query]携带参数
          filename: "static/media/[hash:10][ext][query]"
        }
      },
      {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/, //排除文件
      use: {
        loader: 'babel-loader',
      }
    }
    ]
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // css压缩
    new CssMinimizerPlugin(),
  ],
  //模式
  mode: "production",
  devtool: "source-map",
}