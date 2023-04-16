const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 6
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        use: 'asset/inline',
        parser: {
          esModule: false,
          name: '[name].[ext]',
          dataurlCondition: {
            maxSize: 100000
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'asset/resource',
        parser: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 6
            }
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 6
            }
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {},
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    })
  ]
}
