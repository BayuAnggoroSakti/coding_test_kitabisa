/* eslint-disable no-plusplus */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class TeamsService {
  constructor(players) {
    this._teams = [];
    this._players = players;
  }

  addTeam({ name, teams }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const countTeams = teams.length;
    const _playersAdd = [];
    if (countTeams > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < teams.length; i++) {
        const element = teams[i];
        const player = this._players.filter((n) => n.id === element)[0];
        if (!player) {
          throw new NotFoundError(`Player id ${element} tidak ditemukan`);
        }
        const checkAkhir = _playersAdd.findIndex((obj) => obj.id === player.id);
        if (checkAkhir === -1) {
          _playersAdd.push(player);
        }
      }
    }
    const newTeams = {
      name, players: _playersAdd, id, createdAt, updatedAt,
    };
    this._teams.push(newTeams);

    const isSuccess = this._teams.filter((team) => team.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Team gagal ditambahkan');
    }

    return id;
  }

  addPlayerToTeams({ players, team }) {
    const id = team;
    const index = this._teams.findIndex((_team) => _team.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal menambah player. Id Teams tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();
    const countPlayers = players.length;

    const getTeams = this._teams.filter((n) => n.id === id)[0];
    const _playersAdd = [];
    const listPlayer = getTeams.players;
    if (listPlayer.length > 0) {
      for (let i = 0; i < listPlayer.length; i++) {
        const element = listPlayer[i];
        const player = listPlayer.filter((n) => n.id === element.id)[0];
        if (player) {
          _playersAdd.push(player);
        }
      }
    }
    if (countPlayers > 0) {
      for (let i = 0; i < players.length; i++) {
        const element = players[i];
        const player = this._players.filter((n) => n.id === element)[0];
        if (!player) {
          throw new NotFoundError(`Player id ${element} tidak ditemukan`);
        }

        const checkPlayerDouble = listPlayer.filter((n) => n.id === element)[0];
        if (!checkPlayerDouble) {
          const checkAkhir = _playersAdd.findIndex((obj) => obj.id === player.id);
          if (checkAkhir === -1) {
            _playersAdd.push(player);
          }
        }
      }
    } else {
      throw new InvariantError('Player id tidak boleh kosong');
    }
    this._teams[index] = {
      ...this._teams[index],
      players: _playersAdd,
      updatedAt,
    };
    return this._teams;
  }

  getTeams() {
    return this._teams;
  }

  getTeamById(id) {
    const team = this._teams.filter((n) => n.id === id)[0];
    if (!team) {
      throw new NotFoundError('Team tidak ditemukan');
    }
    return team;
  }
}

module.exports = TeamsService;
