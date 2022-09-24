const Joi = require('joi');

const PlayerPayloadSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  position: Joi.string().required(),
});

module.exports = { PlayerPayloadSchema };
