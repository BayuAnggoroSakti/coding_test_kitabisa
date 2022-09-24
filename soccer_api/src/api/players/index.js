const PlayersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'players',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playersHandler = new PlayersHandler(service, validator);
    server.route(routes(playersHandler));
  },
};
