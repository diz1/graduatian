const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	plugins: [
		new CleanWebpackPlugin()
	],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: "[name].js",
		publicPath: "/dist"
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules'
			}
		]
	}
};
