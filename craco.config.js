const cracoPluginLess = require('next-plugin-antd-less/overrideWebpackConfig');

module.exports = {
  babel: cracoBabel,
  plugins: [
    cracoPluginAnalyze,
    {
      plugin: cracoPluginLess,
      options: {
        modifyVars: {
          '@THEME--DARK': 'theme-dark',
        },
        lessVarsFilePath: './src/styles/variables.less',
        cssLoaderOptions: {
          localIdentName: "[hash:base64:8]",
        },
      },
    },
  ],
};