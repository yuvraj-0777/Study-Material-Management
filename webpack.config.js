const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const generateHtmlPlugin = (title) => {
  return new HtmlWebpackPlugin({
    title,
    filename: `${title.toLowerCase()}.html`,
    template: `./src/${title.toLowerCase()}.html`,
  });
}

const populateHtmlPlugins = (pagesArray) => {
  res = [];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
  })
  return res;
}
const pages = populateHtmlPlugins(["About", "Index", "Login", "Signup", "Dashboard"]);


module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: pages,
}