const { DefinePlugin } = require('webpack')

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        MICRO_APP_URL: JSON.stringify('localhost:8079')
      }
    })
  ]
}
