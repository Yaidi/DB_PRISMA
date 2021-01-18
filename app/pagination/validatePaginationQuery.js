import { Validator } from 'express-json-validator-middleware';
import { PAGINATION_DEFAULT_LIMIT } from './constants';

const paginationSchema = {
  type: 'object',
  properties: {
    limit: {
      type: 'string',
      minValue: 1,
      default: PAGINATION_DEFAULT_LIMIT,
    },
    offset: {
      type: 'string',
      minValue: 0,
      default: 0,
    },
  },
};

const validator = new Validator({ allErrors: true });
const validatePaginationQuery = validator.validate({
  query: paginationSchema,
});

export default validatePaginationQuery;
