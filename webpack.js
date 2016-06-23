require('es6-promise').polyfill();

var objectAssign = require('object-assign'),
    path = require('path'),
    webpack = require('webpack'),
    nodeExternals = require('webpack-node-externals'),
    rootDir = path.join(__dirname, '.'),
    srcDir = path.join(__dirname, './src'),
    distDir = path.join(__dirname, './dist'),
    env = (function (processEnv) {
        var env = objectAssign({}, processEnv),
            envItem;

        for (envItem in env) {
            if (env.hasOwnProperty(envItem)) {
                env[envItem] = '"' + env[envItem] + '"';
            }
        }

        return env;
    }(process.env));

module.exports = {
    context: rootDir,
    name: 'commission-junction',
    node: {
        __dirname: true,
        fs: 'empty'
    },
    devtool: 'source-map',
    entry: ['./index'],
    externals: [nodeExternals()],
    target: 'node',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0']
            },
            exclude: /node_modules/
        }],
        postLoaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0']
            },
            exclude: /node_modules/
        }]
    },
    output: {
        path: distDir,
        filename: 'index.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
        extensions: ['', '.js'],
        root: [srcDir]
    }
};
