const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { readFileSync } = require('fs')
const { name } = require('../../package.json')

module.exports = {
  cache: true,
  mode: 'development',
  entry: [`${process.cwd()}/src/client/index.js`],
  devtool: 'inline-source-map',
  output: {
    path: `${process.cwd()}/dist/`,
    filename: 'client.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: name,
      bulma: readFileSync(
        require('path').join(require.resolve('bulma'), '..', 'css', 'bulma.min.css'),
      ),
      template: path.join(process.cwd(), 'templates', 'template.ejs'),
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': path.resolve(process.cwd(), 'src'),
    },
  },
}
