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
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@pages', resolve('./src/Pages'))
			.set('@h5', resolve('./src/Pages/H5'))
			.set('@utils', resolve('./src/Utils/'))
			.set('@store', resolve('./src/Stores/'))
			.set('@img', resolve('./src/assets/img/'))
			.set('@admin', resolve('./src/Pages/Admin'))
			.set('@widget', resolve('./src/Components'))
		config.resolve.symlinks(true)
	},
}
