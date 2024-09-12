module.exports = {
    packagerConfig: {
        asar: true,
        icon: 'images/icon' // no file extension required
    },
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'shijianzhong',
            name: 'cool-clock'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }