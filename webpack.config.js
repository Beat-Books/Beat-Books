const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: [
    'react-hot-loader/patch',
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.js$/,
        include: /node_modules\/react-dom/,
        use: ['react-hot-loader/webpack'] // preserves state when changes are made to the frontend
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader', // used for importing images
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader' // used for importing SVG files
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // generates index.html file for easy debugging
      templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
      filename: 'index.html',
    })
  ],
  devServer: {
    'static': {
      directory: './dist' //creates & stores a bundle.js file in memory
    },
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  }
};

module.exports = config;