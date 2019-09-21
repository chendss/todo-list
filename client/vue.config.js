const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	lintOnSave: false,
	publicPath: './',
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
			.set('@utils', resolve('./src/Utils/'))
			.set('@stores', resolve('./src/Stores/'))
			.set('@img', resolve('./src/assets/img/'))
			.set('@widget', resolve('./src/Components/'))
			.set('@icon', resolve('./src/assets/icon/'))
		config.resolve.symlinks(true)
	},
	css: {
		loaderOptions: {
			sass: {
				// @/ 是 src/ 的别名
				data: `@import "@/assets/global.scss";`,
			},
		},
  },
  
	productionSourceMap: false,
}
