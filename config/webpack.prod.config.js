const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name]-bundle-[hash:6].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
      },
    }),
    new CleanWebpackPlugin(),
  ],
});
