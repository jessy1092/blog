require('babel-register');

const path = require('path');
const config = require('../webpack.config').default;

module.exports = {
	module: {
		loaders: config.module.loaders.map(loader => Object.assign({}, loader, {
			include: path.join(__dirname, '..', path.basename(loader.include)),
		})),
	},
	postcss: config.postcss,
	svgoConfig: config.svgoConfig,
	externals: {
		jsdom: 'window',
		cheerio: 'window',
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': 'window',
		'react/addons': true,
	},
};
