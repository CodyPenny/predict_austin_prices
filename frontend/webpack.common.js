const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
   main: path.resolve(__dirname, 'src/index.js'),
  }, 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[fullhash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inlineSource: '^.+.(css)$',
    }),
   new MiniCssExtractPlugin(),
  ],
  resolve:{
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ["*",".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.css$/i,
        // include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader",],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset/resource',
        generator:
        {
            filename: 'assets/images/[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/i,
        use: [
          'file-loader',
        ],
      }
    ],
  },
};
