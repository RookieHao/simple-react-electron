process.env.NODE_ENV = 'development';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
process.on('unhandledRejection', err => {
    throw err;
});

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('../config/webpack.config.base');
const devConfig = require('../config/webpack.config.dev');
const { spawn } = require('child_process');
const meger = require('webpack-merge');
const chalk = require('chalk');
const log = console.log;
// 端口，本地服务
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';

const mergerConfig = meger(baseConfig,devConfig)
const serverOption = { hot: true,host: HOST}

WebpackDevServer.addDevServerEntrypoints(mergerConfig, serverOption); // 在webpack编译之前,否则热更新无效

const compiler = webpack(mergerConfig);
const devServer = new WebpackDevServer(compiler,serverOption);
devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
        return log(err);
    }
    spawn('npm',['run','electron'],{ shell: true, env: process.env, stdio: 'inherit' })
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError));
    log(chalk.yellow('Starting the development server...\n'));
    log(chalk.yellow(`server running in ${HOST}:${DEFAULT_PORT}`));
});

['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
        devServer.close();
        process.exit();
    });
});