const ClientError = require('../../exceptions/ClientError');

class PlayersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlayerHandler = this.postPlayerHandler.bind(this);
    this.getPlayersHandler = this.getPlayersHandler.bind(this);
    this.getPlayerByIdHandler = this.getPlayerByIdHandler.bind(this);
    this.putPlayerByIdHandler = this.putPlayerByIdHandler.bind(this);
    this.deletePlayerByIdHandler = this.deletePlayerByIdHandler.bind(this);
  }

  async postPlayerHandler(request, h) {
    try {
      this._validator.validatePlayerPayload(request.payload);
      const { name = 'anonimus', age, position } = request.payload;

      const playerId = await this._service.addPlayer({ name, age, position });

      const response = h.response({
        status: 'success',
        message: 'Player berhasil ditambahkan',
        data: {
          playerId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlayersHandler() {
    const players = await this._service.getPlayers();
    return {
      status: 'success',
      data: {
        players,
      },
    };
  }

  async getPlayerByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const player = await this._service.getPlayerById(id);
      return {
        status: 'success',
        data: {
          player,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putPlayerByIdHandler(request, h) {
    try {
      this._validator.validatePlayerPayload(request.payload);
      const { id } = request.params;

      await this._service.editPlayerById(id, request.payload);

      return {
        status: 'success',
        message: 'Player berhasil diupdate',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlayerByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deletePlayerById(id);

      return {
        status: 'success',
        message: 'Player berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PlayersHandler;
