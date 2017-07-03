var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DotenvPlugin = require('dotenv-webpack');

var importEnv = new DotenvPlugin({
  path: './config.env', // Path to .env file (this is the default)
})

var extractHtml = new HtmlWebpackPlugin({
  title: 'PDX Food Carts',
  template: './src/index.html',
  filename: 'index.html',
  inject: true,
});

var extractStyles = new ExtractTextPlugin({
    filename: "styles.css",
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  devServer: {
  inline: true,
  contentBase: './dist',
  hot: true,
  historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=/dist/img/[name].[ext]",
        query: {
          useRelativePath: process.env.NODE_ENV === "production"
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader",
          {
            loader: "sass-loader",
            options: {
              data: '@import "styles";',
              includePaths: [
                path.resolve(__dirname, './src/globalStyles'),
              ],
            }
          }]
        })
      }
    ]
  },
  plugins: [extractStyles, extractHtml, importEnv],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}
