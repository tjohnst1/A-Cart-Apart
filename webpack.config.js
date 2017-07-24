const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const importEnv = new DotenvPlugin({
  path: path.resolve(__dirname, './config.env'), // Path to .env file (this is the default)
});

const extractHtml = new HtmlWebpackPlugin({
  title: 'PDX Food Carts',
  template: './src/index.html',
  filename: 'index.html',
  inject: true,
});

const extractStyles = new ExtractTextPlugin({
  filename: 'styles.css',
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, './dist'),
  // hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/dist/img/[name].[ext]',
        query: {
          useRelativePath: process.env.NODE_ENV === 'production',
        },
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'sass-loader',
              options: {
                data: '@import "styles";',
                includePaths: [
                  path.resolve(__dirname, './src/globalStyles'),
                ],
              },
            }],
        }),
      },
    ],
  },
  plugins: [extractStyles, extractHtml, importEnv],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
