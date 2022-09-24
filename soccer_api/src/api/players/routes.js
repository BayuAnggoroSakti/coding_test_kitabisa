const routes = (handler) => [
  {
    method: 'POST',
    path: '/players',
    handler: handler.postPlayerHandler,
  },
  {
    method: 'GET',
    path: '/players',
    handler: handler.getPlayersHandler,
  },
  {
    method: 'GET',
    path: '/players/{id}',
    handler: handler.getPlayerByIdHandler,
  },
  {
    method: 'PUT',
    path: '/players/{id}',
    handler: handler.putPlayerByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/players/{id}',
    handler: handler.deletePlayerByIdHandler,
  },
];

module.exports = routes;
