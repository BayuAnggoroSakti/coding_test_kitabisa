const TeamsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'teams',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const teamsHandler = new TeamsHandler(service, validator);
    server.route(routes(teamsHandler));
  },
};
