module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.woff2',
    'dist/assets/images/project.png'
  ]
  // runtimeCaching: [
  //   {
  //     urlPattern: /\/api\/project\//,
  //     handler: 'networkFirst',
  //     options: {
  //       cache: {
  //         maxEntries: 10,
  //         name: 'api-cache'
  //       }
  //     }
  //   }
  // ]
};
