const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	lintOnSave: false,
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 6363,
		https: false,
		hotOnly: true,
		proxy: null, // 设置代理
	},
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('src')).set('utils', resolve('./src/vue-widget/utils'))
	},
}
