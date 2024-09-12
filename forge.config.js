module.exports = {
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