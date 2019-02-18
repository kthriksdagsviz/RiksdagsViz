// config.js
import _ from 'lodash'
const config = require('../config.json')
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;

module.exports = {
	mongo: {
		init: function (params) {
			return require('mongoose').connect(
				global.gConfig.database, {useNewUrlParser: true}
			)
		},
		default: {
			db: 'test',
			port: 27017
		},
		development: {
			host: '127.0.0.1'
		},
		production: {
			db: 'prod',
			host: '192.168.0.10'
		}
	}
}