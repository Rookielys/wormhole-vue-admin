const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 会让webpack自动生成的异步请求url都加上这个前缀
    publicPath: '/wormhole-admin',
    // 构建时不生成SourceMap
    productionSourceMap: false,
    devServer: {
        proxy: {
            "/sys/": {
                // 跨域
                changeOrigin: true,
                target: 'http://localhost:9001',
                pathRewrite: {
                    '/sys': '/sys'
                }
            }
        }
    },
    // 设置引用的路径别名
    /* 这里的设置不生效？ 什么原因？
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"))
            .set("components", resolve("src/components"))
            .set("utils", resolve("src/utils"))
            .set("views", resolve("src/views"))
            .set("assets", resolve("src/assets"))
            .set("apis", resolve("src/apis"))
            .set("routes", resolve("src/routes"))
            .set("stores", resolve("src/stores"));
    },*/
    chainWebpack: config => {
        config.module.rule('svg').exclude.add(resolve('src/assets/icon')).end();
        config.module.rule("icons").test(/\.svg$/)
            .include.add(resolve('src/assets/icon')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    // 这里的配置会被merge到最终的配置里
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src")
            }
        }
    }
}