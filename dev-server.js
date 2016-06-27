var WebPackDevServer = require('webpack-dev-server');
var config = require('./webpack.config')
var webpack = require('webpack')
var port = process.env.PORT ||9000;

function appendDevServerConfig(config) {
    config.output.publicPath = '/public/assets/'

    config.entry.app.unshift('webpack-dev-server/client?http://localhost:' + port + '/',
        'webpack/hot/dev-server');
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())

}
function buildWebpack(webpack, config) {
    webpack(config, function (err, stats) {
        console.log("Starting ...Dev Server");
    });

}
function startDevServer(webpack,config,port){
    new WebPackDevServer(webpack(config), {
        hot: true,
        historyApiFallback: true,
        contentBase: 'public/assets',
        publicPath: config.output.publicPath

    }).listen(port, '0.0.0.0', function (err) {
        if (err) {
            console.log(err);
        }
    });
}
console.log("Appending Dev server config....");
appendDevServerConfig(config);
console.log("Building webpack ...")
buildWebpack(webpack, config);
console.log("Starting Dev server...");
startDevServer(webpack,config,port);

console.log("Listening to Port %s", port);
