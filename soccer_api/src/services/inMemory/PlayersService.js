const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlayersService {
  constructor() {
    this._players = [];
  }

  addPlayer({ name, age, position }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newPlayer = {
      name, position, age, id, createdAt, updatedAt,
    };

    this._players.push(newPlayer);

    const isSuccess = this._players.filter((player) => player.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Player gagal ditambahkan');
    }

    return id;
  }

  getPlayers() {
    return this._players;
  }

  getPlayerById(id) {
    const note = this._players.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotFoundError('Player tidak ditemukan');
    }
    return note;
  }

  editPlayerById(id, { name, age, position }) {
    const index = this._players.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui player. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._players[index] = {
      ...this._players[index],
      name,
      position,
      age,
      updatedAt,
    };
    return this._players;
  }

  deletePlayerById(id) {
    const index = this._players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundError('Player gagal dihapus. Id tidak ditemukan');
    }
    this._players.splice(index, 1);
    return true;
  }
}

module.exports = PlayersService;
