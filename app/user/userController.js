import createError from 'http-errors';
import { get } from 'lodash';

import { insertUser } from './models/user';
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

export { create };
