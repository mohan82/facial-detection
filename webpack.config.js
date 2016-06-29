var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var assetsDir = path.resolve(__dirname, 'public/assets');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var config = {

    entry: {
        "app": ['./app/index.js'],
        "vendor": ["clm",'pModel']
    },
    devtool: 'source-map',
    output: {
        path: assetsDir,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                loader: 'babel',
                include: path.join(__dirname, 'app'),
                exclude: path.join(__dirname, 'app/vendor'),
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },{
                test: /\.css$/,
                loader: 'style!css!postcss'
            },{
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000@name=[name][ext]'
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    resolve: {
        root: path.resolve('./app'),
        alias: {
            'clm': path.resolve('./app/vendor/js/clmtrackr.js'),
            'pModel': path.resolve('./app/vendor/js/model_pca_20_svm.js')
        }
    },
    plugins: [
        chunkJs(),
        configureHtml(),
        provideQuery()]

}

function chunkJs() {
   return new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")

}
function configureHtml() {
    return new HtmlWebpackPlugin
    (
        {
            template: 'app/index.ejs',
            inject: 'body'
        }
    );
}

function provideQuery() {
    return new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        clm:'clm',
        pModel:'pModel'
    });
}
module.exports = config;
