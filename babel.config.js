const reactStrictPreset = require('react-strict-dom/babel-preset')

function getPlatform(caller) {
  return caller && caller.platform
}

function getIsDev(caller) {
  if (caller?.isDev != null) return caller.isDev
  // https://babeljs.io/docs/options#envname
  return (
    process.env.BABEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  )
}

module.exports = function (api) {
  const platform = api.caller(getPlatform)
  const isDev = api.caller(getIsDev)

  const presets = ['babel-preset-expo']
  const plugins = []

  if (platform === 'web') {
    presets.push([
      reactStrictPreset,
      {
        debug: true,
        dev: false, // isDev,
        rootDir: __dirname,
      },
    ])
  }

  return {
    plugins,
    presets,
  }
}
