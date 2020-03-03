// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@src': path.resolve(__dirname, 'src'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@store': path.resolve(__dirname, 'src/store'),
      },
    },
  },
};
