module.exports = { //配置别名
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'componnets': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}