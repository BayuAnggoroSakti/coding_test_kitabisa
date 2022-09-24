/* eslint-disable max-len */
/* eslint-disable no-undef */
const PlayersService = require('../services/inMemory/PlayersService');
const TeamsService = require('../services/inMemory/TeamsService');

const playersService = new PlayersService();
const teamsService = new TeamsService(playersService._players);
describe('Players & Teams Scenario', () => {
  const playerAdd = { name: 'Bayu', age: '27', position: 'keeper' };
  test('Adding Player', () => {
    expect(playersService.addPlayer(playerAdd)).toBeDefined();
  });

  test('Get All Player', () => {
    expect(playersService.getPlayers()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Bayu' }),
        expect.objectContaining({ age: '27' }),
        expect.objectContaining({ position: 'keeper' }),
      ]),
    );
  });

  test('Getting Specified Player', () => {
    expect(playersService.getPlayerById(playersService._players[0].id)).toEqual(
      expect.objectContaining({ name: 'Bayu' }),
      expect.objectContaining({ age: '27' }),
      expect.objectContaining({ position: 'keeper' }),
    );
  });

  test('Update Player', () => {
    const objUpdate = { name: 'Bayu Revisi', age: '27', position: 'keeper' };
    expect(playersService.editPlayerById(playersService._players[0].id, objUpdate)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Bayu Revisi' }),
        expect.objectContaining({ age: '27' }),
        expect.objectContaining({ position: 'keeper' }),
      ]),
    );
  });
  test('Delete Player', () => {
    expect(playersService.deletePlayerById(playersService._players[0].id)).toBeTruthy();
  });
  test('Adding Teams with or Without Player', () => {
    playersService.addPlayer(playerAdd);
    const teamAdd = { name: 'Team A', teams: [playersService._players[0].id] };
    expect(teamsService.addTeam(teamAdd)).toBeDefined();
  });
  test('Getting All Teams', () => {
    expect(teamsService.getTeams()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Team A' }),
        expect.objectContaining({
          players: expect.arrayContaining([
            expect.objectContaining({ name: 'Bayu' }),
            expect.objectContaining({ age: '27' }),
            expect.objectContaining({ position: 'keeper' }),
          ]),
        }),
      ]),
    );
  });
  test('Getting Specified Teams', () => {
    expect(teamsService.getTeamById(teamsService._teams[0].id)).toEqual(
      expect.objectContaining({ name: 'Team A' }),
      expect.objectContaining({
        players: expect.arrayContaining([
          expect.objectContaining({ name: 'Bayu' }),
          expect.objectContaining({ age: '27' }),
          expect.objectContaining({ position: 'keeper' }),
        ]),
      }),
    );
  });
  test('Adding Players To Teams', () => {
    const playerAdd2 = { name: 'Anggoro', age: '17', position: 'Striker' };
    playersService.addPlayer(playerAdd2);
    const playerAddTeam = { players: [playersService._players[1].id], team: teamsService._teams[0].id };
    expect(teamsService.addPlayerToTeams(playerAddTeam)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Team A' }),
        expect.objectContaining({
          players: expect.arrayContaining([
            expect.objectContaining({ name: 'Anggoro' }),
            expect.objectContaining({ age: '17' }),
            expect.objectContaining({ position: 'Striker' }),
          ]),
        }),
      ]),
    );
  });
});
