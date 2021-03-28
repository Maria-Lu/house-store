const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/scripts/index.js',
    goods: './src/scripts/goods.js',
    cart: './src/scripts/cart.js',
    order: './src/scripts/order.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'goods.html',
      template: './src/goods.html',
      chunks: ['goods']
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'cart.html',
      template: './src/cart.html',
      chunks: ['cart']
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'order.html',
      template: './src/order.html',
      chunks: ['order']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};
