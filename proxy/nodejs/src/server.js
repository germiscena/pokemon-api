var http = require('http'),
    httpProxy = require('http-proxy');

var webServerPort = process.env.WEB_SERVER_PORT || 3333; // undefined
var clientAppHost = process.env.CLIENT_APP_HOST || 'http://127.0.0.1:3000';
var apiHost = process.env.API_HOST || 'http://127.0.0.1:5000';
var apiPrefix = "/api";

var proxy = httpProxy.createProxyServer({});

http.createServer((req, res) => {
    
    console.log(`\nserving: ${req.url}`);

    if (req.url == '/health') {
        res.statusCode = 200;
        return res.end("OK");
    }

    if (req.url.startsWith(apiPrefix)) {
        req.url = req.url.replace(apiPrefix, '');

        console.log(`\nproxying: ${req.url} to ${apiHost}`);

        return proxy.web(req, res, { target: apiHost }, (error, req, res) => {
                res.statusCode = 500; return res.end(error.message);
            }
        );
    }

    console.log(`\nproxying: ${req.url} to ${clientAppHost}`);

    return proxy.web(req, res, { target: clientAppHost }, (error, req, res) => {
        res.statusCode = 500; return res.end(error.message);
    });

}).listen(webServerPort);


console.log(`Started proxy server on port ${webServerPort}. Client app host: ${clientAppHost}. Api host: ${apiHost}.`);