const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')
const HappyPack = require('happypack')

module.exports = {
  name: 'server',
  cache: true,
  mode: 'development',
  entry: [`${process.cwd()}/src/server/index.js`],
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  output: {
    path: `${process.cwd()}/dist/`,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
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
  plugins: [
    new Dotenv({ path: `${process.cwd()}/.env` }),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
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
