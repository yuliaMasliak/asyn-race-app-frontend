const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images/',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],

  mode: 'development',
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
};
