const path = require('path');
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js'),
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
        //     sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
        //   },
        // },
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
};
