import path from "path";
import { fileURLToPath } from "url";

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  entry: {
    app: path.resolve(dirname, "src", "index.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(dirname, "node_modules/ionicons/dist/svg/"),
          to: path.resolve(dirname, "dist/svg/ionicons/"),
        },
        {
          from: "./src/assets",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    modules: [path.resolve(dirname, "./src/"), path.resolve("./node_modules")],
  },
  ignoreWarnings: [/Failed to parse source map/],
  stats: "minimal",
  devServer: {
    static: {
      directory: path.join(dirname, "dist"),
    },
    compress: true,
    port: 8100,
  },
};
