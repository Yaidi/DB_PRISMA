import { NotFoundError } from 'objection';

import { insertUser } from './models/user';
import createError from 'http-errors';

const create = async (req, res) => {
  try {
    const user = await insertUser(req.body);

    return res.status(201).json(user);
  } catch (err) {
    createError(500, err);
  }
};

export { create };
