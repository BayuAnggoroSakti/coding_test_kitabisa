const InvariantError = require('../../exceptions/InvariantError');
const { TeamPayloadSchema, PlayerTeamPayloadSchema } = require('./schema');

const TeamsValidator = {
  validateTeamPayload: (payload) => {
    const validationResult = TeamPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePlayerTeamPayload: (payload) => {
    const validationResult = PlayerTeamPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TeamsValidator;
