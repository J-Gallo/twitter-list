module.exports = () => {
  const url = {
    devUrl: 'http://localhost:3000',
    prodUrl: 'https://twitter-list.now.sh'
  }

  function getBaseUrl (env) {
    let baseUrl
    if (env === 'production') {
      baseUrl = url.prodUrl
    } else {
      baseUrl = url.devUrl
    }

    return baseUrl
  }

  return getBaseUrl
}
