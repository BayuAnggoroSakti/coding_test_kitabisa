const ClientError = require('../../exceptions/ClientError');

class PlayersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postTeamHandler = this.postTeamHandler.bind(this);
    this.getTeamsHandler = this.getTeamsHandler.bind(this);
    this.getTeamByIdHandler = this.getTeamByIdHandler.bind(this);
    this.postAddPlayerToTeam = this.postAddPlayerToTeam.bind(this);
  }

  async postTeamHandler(request, h) {
    try {
      this._validator.validateTeamPayload(request.payload);
      const { name = 'anonimus', teams } = request.payload;

      const teamId = await this._service.addTeam({ name, teams });

      const response = h.response({
        status: 'success',
        message: 'Team berhasil ditambahkan',
        data: {
          teamId,
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

  async getTeamsHandler() {
    const teams = await this._service.getTeams();
    return {
      status: 'success',
      data: {
        teams,
      },
    };
  }

  async getTeamByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const team = await this._service.getTeamById(id);
      return {
        status: 'success',
        data: {
          team,
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

  async postAddPlayerToTeam(request, h) {
    try {
      this._validator.validatePlayerTeamPayload(request.payload);
      const { players = [], team } = request.payload;
      await this._service.addPlayerToTeams({ players, team });
      return {
        status: 'success',
        message: `Player berhasil ditambahkan ke dalam teams id ${team}`,
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
