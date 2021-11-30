module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      outputModule: true
    },
    output: {
      enabledLibraryTypes: ['module'],
      libraryTarget: 'module',
      module: true
    }
  }
}