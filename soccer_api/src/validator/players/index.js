const InvariantError = require('../../exceptions/InvariantError');
const { PlayerPayloadSchema } = require('./schema');

const PlayersValidator = {
  validatePlayerPayload: (payload) => {
    const validationResult = PlayerPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlayersValidator;
