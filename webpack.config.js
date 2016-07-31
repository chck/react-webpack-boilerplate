import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import webpack from 'webpack';

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

//共通設定
const common = {
  //ビルドに含めるファイルを格納するディレクトリ
  entry: PATHS.app,

  resolve: {
    //importするときに拡張子を省略できるように
    extensions: ['', '.js', '.jsx']
  },

  //ビルドしたファイルを格納するディレクトリとファイル名
  output: {
    path: PATHS.build,
    filename: 'build.js'
  },

  module: {
    loaders: {
      //Babelローダー
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: PATHS.app
    }
  },

  plugins: [
    //生成するHTMLの設定
    new htmlWebpackPlugin({
      title: 'Kanban'
    })
  ]
};

//npm startを実行した時の設定
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

//npm buildを実行した時の設定
if (TARGET === 'build') {
  module.exports = merge(common, {});
}