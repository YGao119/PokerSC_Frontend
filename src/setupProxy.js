const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://45.79.72.230:8080',
      changeOrigin: true,
    })
  );
};