const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".css", ".scss", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: {
                filter: (url) => {
                  if (url.startsWith("data:")) {
                    return false;
                  }
                  return true;
                },
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ModuleFederationPlugin({
      // name: "MICRO_1",
      // remotes: {
      //   FIRST_APP: "FIRST_APP@http://localhost:8080/remoteEntry.js",
      // },
      name: "MICRO_1",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/contoh.js",
      },
      remotes: {
        FIRST_APP: "FIRST_APP@http://localhost:8080/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
    }),
  ],
  devServer: {
    port: 8081, // Port untuk klien webpack dev
  },
};