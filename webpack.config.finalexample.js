const path = require('path');

module.exports = {
  mode: 'development',
  entry: './finalexample/index.ts',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
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
    path: path.resolve(__dirname, 'finalexample'),
  },
};
