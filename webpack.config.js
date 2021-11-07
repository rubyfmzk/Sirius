const path = require('path')
const webpack = require('webpack')

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  // mode: 'development',
  mode: 'production',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/Index.js',

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },

  // ファイルの出力設定
  output: {
    // 出力するファイル名
    filename: "Sirius.js",

    //  出力先のパス
    path: path.join(__dirname, 'dist'),

    // ライブラリモード
    library:{
      name: 'Sirius',
      export: 'default',
      type: 'umd',
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },

  performance: { hints: false },
};