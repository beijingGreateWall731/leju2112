'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const os = require('os')
console.log('os=>', os.networkInterfaces())

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: '/leju-admin-server-2112/',
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    /**
     * 什么事跨域？
     * 由于浏览器的安全同源策略 脚本和服务 协议 域名 端口 不一致时就会出现跨域
     * 会导致什么？
     * no allow access .......
     *
     * 怎么解决？
     * 开发阶段 配置代理
     * 上线部署：
     * 集成部署： 把dist 给后台，后台会把dist文件内容放到后台代码里面
     * 独立部署：1.nginx 配置代理 运维 后台  绕过跨域
     *          2.后台配置cors 绕过跨域
     *
     * 自动化部署：提交代码就部署成功了  运维 后台
     */
    // 开发阶段起作用，辅助开发
    proxy: {
      // key:value
      // key: 相对路径的开始单词

      // target 目标路径
      // key 可以是正则表达式  | 前后不要有空格
      '/(lejuAdmin|admin)': {
        target: defaultSettings.host,
        // ws: true,  // websoket 协议
        // secure: false, // https协议
        changeOrigin: true, // 跨域
        pathRewrite: {

        }
      }
      /**
       * http://xxxx.com/companyAddress/addressList
       * http://xxxx.com/text/aaa
       * http://xxxx.com/bbb/aaa
       */

      /** *
       *      /api/companyAddress/addressList
       *      /api/text/aaa
       *      /api/bbb/aaa
       */
      // '/api': {
      //   target: defaultSettings.host,
      //   // secure: false, // https协议
      //   changeOrigin: true, // 跨域
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }

    },
    // before===>after
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }

  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
