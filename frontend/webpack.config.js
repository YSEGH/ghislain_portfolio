const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "/images/",
          publicPath: "./images/",
        },
      },
    ],
  },
  optimization: {
    /* minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/,
      }),
    ], */
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
    }),
    /*     new UglifyJsPlugin(),
     */ new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CompressionPlugin({
      compressionOptions: { level: 9 },
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true,
    }),
  ],

  devtool: "source-map",
  devServer: {
    contentBase: __dirname + "dist",
    watchContentBase: true,
    hot: true,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  externals: {
    fs: "commonjs fs",
    path: "commonjs path",
  },
};
