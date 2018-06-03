const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HappyPack = require('happypack')

module.exports = {
  name: 'client',
  cache: true,
  mode: 'development',
  entry: ['webpack-hot-middleware/client', `${process.cwd()}/src/client/index.js`],
  devtool: 'inline-source-map',
  output: {
    path: `${process.cwd()}/dist/client.js`,
    publicPath: '/static/',
    filename: 'client.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  plugins: [
    new Dotenv({ path: `${process.cwd()}/.env` }),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HappyPack({
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': path.resolve(process.cwd(), 'src'),
    },
  },
}
