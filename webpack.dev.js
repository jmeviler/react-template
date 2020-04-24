const path = require('path');

const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const {
  BACKEND_PROTOCOL = 'http',
  BACKEND_DOMAIN = '', // TODO
} = process.env;

module.exports = {
  mode: 'production',
  devtool: 'sourcemap',
  stats: { children: false },
  entry: { app: path.resolve(__dirname, 'src/index.js') },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: { alias: { '~': path.resolve(__dirname, 'src') } },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        { loader: 'babel-loader' },
      ],
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          javascriptEnabled: true,
          paths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src'),
          ],
        },
      }],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // This can reduce react lib size and disable some dev feactures like props validation
        NODE_ENV: JSON.stringify('production'),
        ENV: JSON.stringify('development'),
        BACKEND_PROTOCOL: JSON.stringify(BACKEND_PROTOCOL),
        BACKEND_DOMAIN: JSON.stringify(BACKEND_DOMAIN),
      },
    }),
    new MiniCssExtractPlugin({ filename: 'app.min.css' }),
    new CopyWebpackPlugin([
      { from: 'static', to: 'static' },
    ]),
    new HtmlWebpackPlugin({
      title: 'template-react',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/template.html'),
    }),
  ],
};
