/* eslint-disable */
let path = require('path')
let webpack = require('webpack')
let packageJSON = require('./package.json')
let ENV = process.env.npm_lifecycle_event

let config = {
  entry: '',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: 'ts-loader',
      },
      {
        test: /[\\|\/]_[\S]*\.(css|less)$/,
        use: [
          'to-string-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: ['url-loader?limit=0'],
      },
    ],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  stats: {
    // Nice colored output
    colors: true,
  },
  resolve:{
    extensions:['.js','.ts']
  }
}

if (ENV === 'build' || ENV === 'build-min' || ENV === 'dev') {
  config = {
    entry: {
      cax: './src/main.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      library: packageJSON.name,
      libraryTarget: 'umd',
      filename:  packageJSON.name+'.js',
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          loader: 'ts-loader',
        },
  
        {
          test: /[\\|\/]_[\S]*\.(css|less)$/,
          use: [
            'to-string-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')],
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp)$/,
          use: ['url-loader?limit=0'],
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin(
        ' linear-regression-chart v' +
          packageJSON.version +
          '\r\n By https://github.com/dwqdaiwenqi \r\n Github: https://github.com/dwqdaiwenqi/linear-regression-chart\r\n MIT Licensed.'
      ),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    stats: {
      // Nice colored output
      colors: true,
    },
    resolve:{
      extensions:['.js','.ts']
    }
  }

  if (ENV === 'build-min') {
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        library: packageJSON.name,
        libraryTarget: 'umd',
        filename:  packageJSON.name+'.min.js',
    }
  }
} else {
  config.entry = path.resolve(__dirname, './examples/' + ENV + '/main.ts')
  config.output.path = path.resolve(__dirname, './examples/' + ENV + '/')
  config.output.filename = 'bundle.js'
}

module.exports = config
