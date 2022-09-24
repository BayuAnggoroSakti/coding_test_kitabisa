const Joi = require('joi');

const TeamPayloadSchema = Joi.object({
  name: Joi.string().required(),
  teams: Joi.array().items(Joi.string()),
});

const PlayerTeamPayloadSchema = Joi.object({
  team: Joi.string().required(),
  players: Joi.array().items(Joi.string()).required(),
});

module.exports = { TeamPayloadSchema, PlayerTeamPayloadSchema };
