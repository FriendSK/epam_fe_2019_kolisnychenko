const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, 'HW'),
  mode: 'development',
  entry: {
    index: ['@babel/polyfill', './js/index.js'],
    blog: ['@babel/polyfill', './js/blog.js'],
    post: ['@babel/polyfill', './js/post.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'HW/img'),
        to: path.resolve(__dirname, 'dist/img'),
      },
    ]),
    new HTMLWebpackPlugin({
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      inject: true,
      chunks: ['blog'],
      filename: 'blog.html',
      template: './blog.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      inject: true,
      chunks: ['post'],
      filename: 'post.html',
      template: './post.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new StylelintPlugin({
      failOnError: false,
      configFile: '.stylelintrc.json',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        // exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        // exclude: /(node_modules)/,
        use: {
          loader: 'file-loader',
          options: {
            // name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
      {
        test: /\.(png|jpg|png|svg)$/i,
        // exclude: /(node_modules)/,
        use: {
          loader: 'file-loader',
          options: {
            // name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
      },
      // {
      //     test: /\.svg$/,
      //     loader: 'svg-inline-loader',
      // },
      // {
      //     test: /\.svg$/,
      //     loader: 'svg-sprite-loader',
      // },
    ],
  },
};
