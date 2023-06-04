/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");

module.exports = function override(config, env) {
	// Add fallback for 'crypto' module
	config.resolve.fallback = {
		...config.resolve.fallback,
		crypto: require.resolve("crypto-browserify"),
		stream: require.resolve("stream-browserify"),
	};

	// Add plugin to provide the Buffer global object
	config.plugins.push(
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		})
	);

	return config;
};
