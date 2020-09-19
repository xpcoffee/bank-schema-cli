const webpack = require("webpack");
const path = require("path");
const WebpackShellPlugin = require("webpack-shell-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/cli.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  externals: [],
  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
    }),
    new WebpackShellPlugin({
      onBuildEnd: ["chmod +x dist/bank-schema-cli"],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bank-schema-cli",
    libraryTarget: "var",
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  // },
};
