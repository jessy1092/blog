
import path              from 'path';
import webpack           from 'webpack';
import atImport          from 'postcss-import';
import cssnext           from 'postcss-cssnext';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'react-hot-loader/patch',
		'babel-polyfill',
		'./src/index.js',
	],
	output: {
		path: path.join(__dirname, '_public'),
		filename: '[name].bundle.js',
		publicPath: '',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({ template: './src/index.html' }),
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			include: path.join(__dirname, 'src'),
			exclude: path.join(__dirname, 'node_modules'),
			loader: 'babel',
			query: {
				plugins: ['react-hot-loader/babel'],
			},
		}, {
			test: /\.css$/,
			include: path.join(__dirname, 'src'),
			loader: 'style!css?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
		}, {
			test: /\.(jpe?g|png|gif)$/,
			loaders: [
				'url?limit=10000&name=./assets/[name]__[hash].[ext]',
			],
			include: path.join(__dirname, 'src'),
		}, {
			test: /\.svg$/,
			loaders: [
				'babel',
				'svg-react',
				'svgo?useConfig=svgoConfig',
				'svg-css-modules',
				'string-replace?search=%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22&replace=',
			],
			include: path.join(__dirname, 'src'),
		}],
	},
	postcss: () => ([
		atImport(),
		cssnext(),
	]),
	svgoConfig: {
		plugins: [
			{ removeTitle: true },
			{ collapseGroups: false },
		],
	},
	node: {
		fs: 'empty',
	},
};
