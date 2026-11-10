const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    name: 'build',
    mode: 'production',
    entry: './src/zGrid.ts',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
      extensionAlias: {
        '.js': ['.ts', '.js']
      }
    },
    experiments: {
      outputModule: true,
    },
    output: {
      filename: 'zGrid.js',
      module: true,
      library: {
        type: 'module',
      },
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    name: 'example',
    mode: 'development',
    entry: './example/src/index.ts',
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.example.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'example/dist'),
    },
  },
];
