const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        MICRO_APP_URL: JSON.stringify('localhost:8079')
      }
    })
  ]
}
