var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'news'
    },
    port: 3000,
    db: 'mongodb://jingmin:vkbje76@localhost/test'
  },

  test: {
    root: rootPath,
    app: {
      name: 'news'
    },
    port: 3000,
    db: 'mongodb://jingmin:vkbje76@localhost/test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'news'
    },
    port: 3000,
    db: 'mongodb://jingmin:vkbje76@localhost/test'
  }
};

module.exports = config[env];
