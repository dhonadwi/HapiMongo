const Hapi = require('@hapi/hapi');
const dbMongo = require('./dbConfig');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    // port: 5000,
    // host: 'localhost',
    port: process.env.PORT || 8080, //untuk deploy ke heroku
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url: dbMongo,
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
