var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  // entry:  __dirname + "/app/App.js",
  // entry:  __dirname + "/app-kanban-flux/App.js",
  entry:  __dirname + "/app-clock-perf/App.js",
  // entry:  __dirname + "/app-react-dnd/App.js",
  // entry: __dirname + "/test/ContactsApp.js",
  // entry:  __dirname + "/test/AnimationShoppingList.js",
  // entry:  __dirname + "/app-routing/App.js",
  // entry:  __dirname + "/app-flux/App.js",
  // entry:  __dirname + "/app-airport/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    }]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
