const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(
        createProxyMiddleware(['twitter', 'coin'], {
            target: "http://localhost:5000"
        })
    )
}