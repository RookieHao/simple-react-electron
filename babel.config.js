module.exports = function (api) {
  api.cache(true)
  return {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": false,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ],
      [
        'import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        }
      ]
    ]
  }
}