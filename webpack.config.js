const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/zGrid.ts',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'zgrid_default.css',
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
  },
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'zGrid.js',
    library: {
      type: 'module',
    },
    path: path.resolve(__dirname, 'dist'),
  },
};
