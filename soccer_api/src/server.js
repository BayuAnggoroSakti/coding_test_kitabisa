require('dotenv').config();
const Hapi = require('@hapi/hapi');
const players = require('./api/players');
const teams = require('./api/teams');
const TeamsService = require('./services/inMemory/TeamsService');
const PlayersService = require('./services/inMemory/PlayersService');
const PlayersValidator = require('./validator/players');
const TeamsValidator = require('./validator/teams');

const init = async () => {
  const playersService = new PlayersService();
  const teamsService = new TeamsService(playersService._players);
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([{
    plugin: players,
    options: {
      service: playersService,
      validator: PlayersValidator,
    },
  },
  {
    plugin: teams,
    options: {
      service: teamsService,
      validator: TeamsValidator,
    },
  }]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
