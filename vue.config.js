const { codeInspectorPlugin } = require('code-inspector-plugin');
// 是否生产环境
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  pages: {
    index: {
      title: '飞书连接器',
      entry: 'src/main.ts',
      chunks: [
        'npm.vendor',
        'npm.@arco-design',
        'npm.lodash',
        'npm.@surely',
        'npm.@vue',
        'npm.@gj',
        'runtime',
        'index',
      ],
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ['agent-markdown-vue'],
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
  chainWebpack: (config) => {
    // 删除无用代码
    config.when(isProd, (config) => {
      config.optimization.minimizer('terser').tap((args) => {
        // 移除debugger
        args[0].terserOptions.compress.drop_debugger = true;
        // 移除console.log
        args[0].terserOptions.compress.pure_funcs = ['console.log'];
        // 移除注释
        args[0].terserOptions.output = {
          comments: false,
        };

        return args;
      });
    });

    if (!isProd) {
      config.plugin('code-inspector-plugin').use(
        codeInspectorPlugin({
          bundler: 'webpack',
          enforcePre: false,
        })
      );
    }
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 30000,
        minChunks: 1,
        cacheGroups: {
          vue: {
            test: /node_modules.*((vue[\\/]dist))|(@vue)|(vue-router)|(pinia)|(vue-i18n)|(@vueuse)|(vue-demi)|(axios)/,
            name: 'npm.@vue',
            priority: -5,
          },
          arco: {
            test: /node_modules.*@arco-design/,
            name: 'npm.@arco-design',
            priority: -5,
          },
          surely: {
            test: /node_modules.*((ant-design-vue)|(@surely-vue))/,
            name: 'npm.@surely',
            priority: -5,
          },
          gj: {
            test: /node_modules.*@gj/,
            name: 'npm.@gj',
            priority: -5,
          },
          lodash: {
            test: /node_modules.*lodash/,
            name: 'npm.lodash',
            priority: -5,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'npm.vendor',
            priority: -7,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
};
