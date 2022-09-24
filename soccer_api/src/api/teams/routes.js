const routes = (handler) => [
  {
    method: 'POST',
    path: '/teams',
    handler: handler.postTeamHandler,
  },
  {
    method: 'POST',
    path: '/teams/addPlayers',
    handler: handler.postAddPlayerToTeam,
  },
  {
    method: 'GET',
    path: '/teams',
    handler: handler.getTeamsHandler,
  },
  {
    method: 'GET',
    path: '/teams/{id}',
    handler: handler.getTeamByIdHandler,
  },
];

module.exports = routes;
