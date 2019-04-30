const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: {
    index: path.resolve(__dirname, '../app')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname,'..','dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../app'),
      api: path.resolve(__dirname, '../app/api'),
      components: path.resolve(__dirname, '../app/components'),
      models: path.resolve(__dirname, '../app/models'),
      utils: path.resolve(__dirname, '../app/utils'),
      router: path.resolve(__dirname, '../app/router')
    }
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          }
        ],
        exclude: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          }
        ],
        include: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
        exclude: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
        include: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'less-loader',
        ],
        exclude: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'less-loader',
        ],
        include: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader:'cache-loader',
            options:{
              cacheDirectory:path.resolve('node_modules','.cache-loader')
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"],
              plugins: ['@babel/transform-runtime', "@babel/plugin-proposal-class-properties"],
            },
          },
        ],
        include: [path.resolve(__dirname, '../app')],
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        },
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      minify: true,
      chunks: ['index'],
    }),
    new webpack.ProvidePlugin({
      request: 'utils/request'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // new ScriptExtHtmlPlugin({
    //   defaultAttribute: 'defer'
    // })
  ]
};