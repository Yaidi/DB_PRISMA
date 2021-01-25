import createError from 'http-errors';
import { get } from 'lodash';
import { NotFoundError } from 'objection';

import { insertUser, findUserByUsername, isPasswordValid } from './models/user';
import { insertToken } from 'app/notification';

const create = async (req, res, next) => {
  try {
    const user = await insertUser(req.body);
    const deviceId = get(req, 'body.deviceId');
    user.token = await insertToken(user, deviceId);

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(createError(500, err));
  }
};

const signIn = async (req, res, next) => {
  try {
    const username = get(req, 'body.username');
    const password = get(req, 'body.password');
    const deviceId = get(req, 'body.deviceId');
    const user = await findUserByUsername(username);

    if (user && isPasswordValid(user, password)) {
      user.token = await insertToken(user, deviceId);

      return res.status(200).json(user);
    } else {
      throw new NotFoundError();
    }
  } catch (err) {
    console.error(err);
    if (err instanceof NotFoundError) {
      err.message = 'Incorrect username or password';
      next(createError('403', err));
    } else {
      next(createError(500, err));
    }
  }
};

export { create, signIn };
