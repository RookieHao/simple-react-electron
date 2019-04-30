const axios = require('axios')

let request = axios.create({
  baseURL: 'http://5c8cfb1e35643b0014938925.mockapi.io'
});

var CancelToken = axios.CancelToken
let requests = []
let remRquest = (request) => {
  for (let i in requests) {
    if (requests[i].u === request) {
      requests[i].cancel()
      requests.splice(i, 1)
    }
  }
}
request.interceptors.request.use(config=>{
  remRquest(config.url + '&' + config.method + '&' + (config.data && JSON.stringify(config.data)) + '&' + (config.params && JSON.stringify(config.params)))
  config.cancelToken = new CancelToken((cancel) => {
    requests.push({ u: config.url + '&' + config.method + '&' + (config.data && JSON.stringify(config.data)) + '&' + (config.params && JSON.stringify(config.params)), cancel })
  })
  return config
})
http.interceptors.response.use(response=>{
  remRquest(response.config.url + '&' + response.config.method + '&' + (response.config.data && JSON.stringify(response.config.data)) + '&' + (response.config.params && JSON.stringify(response.config.params)))
})
module.exports = request