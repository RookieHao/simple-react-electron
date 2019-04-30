process.env.NODE_ENV = 'production';
process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const baseConfig = require('../config/webpack.config.base');
const prodConfig = require('../config/webpack.config.prod');
const path = require('path');
const { spawn } = require('child_process');
const meger = require('webpack-merge');
const rimraf = require('rimraf')
const mergerConfig = meger(baseConfig, prodConfig)
const compiler = webpack(mergerConfig);
compiler.run((err, stats) => {
  if (err) {
    console.log('Failed to compile.', [err]);
    process.exit(1);
  }

  if (stats.compilation.errors.length) {
    console.log('Failed to compile.', stats.compilation.errors);
    process.exit(1);
  }
  rimraf(path.resolve(__dirname,'..','electron_build'),(err)=>{
    if(err){
      console.log(err) 
      return 
    }
    spawn('build',[process.argv[2]],{ shell: true, env: process.env, stdio: 'inherit' })
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError));
    console.log('build success');
  })
})