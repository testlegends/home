/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {

  // If you leave the adapter config unspecified 
  // in a model definition, 'default' will be used.
  'default': 'mongodb',

  // Persistent adapter for DEVELOPMENT ONLY
  // (data is preserved when the server shuts down)
  disk: {
    module: 'sails-disk'
  },

  test: {
    module: 'sails-memory'
  },

  mongodb: {
    module: 'sails-mongo',
    host: process.env.MONGOHQ_HOST,
    port: process.env.MONGOHQ_PORT,
    database: process.env.MONGOHQ_DATABASE,
    user: process.env.MONGOHQ_USERNAME,
    password: process.env.MONGOHQ_PASSWORD
  },

  mongodb_dev: {
    module: 'sails-mongo',
    host: 'localhost',
    database: 'project_catalog'
  }
};
