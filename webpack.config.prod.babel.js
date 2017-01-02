
import path              from 'path';
import webpack           from 'webpack';
import atImport          from 'postcss-import';
import cssnext           from 'postcss-cssnext';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractText = new ExtractTextPlugin('[name].[contenthash].css', { allChunks: true });

const webpackProdConfig = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'./src/index.js',
	],
	output: {
		path: path.join(__dirname, '_public'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		// Chunk js file for async loading
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			children: true,
			minChunks: 2,
			async: true,
		}),

		// OccurrenceOrderPlugin is needed for long-term caching to work properly.
		// See http://mxs.is/googmv
		new webpack.optimize.OccurrenceOrderPlugin(true),

		// Merge all duplicate modules
		new webpack.optimize.DedupePlugin(),

		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeScriptTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
			inject: true,
			showErrors: false,
			filename: 'index.html',
		}),

		extractText,

	],
	module: {
		loaders: [{
			test: /\.js?$/,
			include: [
				path.join(__dirname, 'src'),
			],
			exclude: path.join(__dirname, 'node_modules'),
			loader: 'babel',
		}, {
			test: /\.css$/,
			include: [
				path.join(__dirname, 'src'),
			],
			loader: extractText.extract('style-loader', 'css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize&-autoprefixer!postcss-loader'),
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

// Minify and optimize the JavaScript
if (process.env.NODE_ENV === 'production') {
	webpackProdConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false, // ...but do not show warnings in the console (there is a lot of them)
			},
		}),
	);
}
export default webpackProdConfig;
