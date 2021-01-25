import request from 'supertest';

import app from 'app';
import { User, insertUser } from '../../app/user';
import { validUser } from '../helpers/factories/users';
import '../helpers/dbTransaction';

const UUID_REGEXP = /^(\w{8}-\w{4}-\w{4}-\w{4}-\w{12}){1}$/;

describe('Template configs endpoints', () => {
  describe('POST /users/sign-up', () => {
    it('responds with 201 the created user and the new token', async () => {
      const body = validUser();
      const deviceId = 'b4b252a0-5cc6-446c-b124-365bd85cee90';
      const response = await request(app)
        .post('/users/sign-up')
        .send({ ...body, deviceId });

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          id: expect.stringMatching(UUID_REGEXP),
          token: expect.objectContaining({
            id: expect.stringMatching(UUID_REGEXP),
          }),
        })
      );
    });

    it("doesn't store the user's password in plain text", async () => {
      const body = validUser({ username: 'otherUserName' });
      const deviceId = 'b4b252a0-5cc6-446c-b124-365bd85cee90';
      const response = await request(app)
        .post('/users/sign-up')
        .send({ ...body, deviceId });

      expect(response.status).toEqual(201);
      const createdUser = await User.query().first();

      expect(createdUser).toBeDefined();
      expect(createdUser.password).not.toEqual(body.password);
    });
  });

  describe('POST /users/sign-in', () => {
    it('responds with 200, the user profile and a new token', async () => {
      const userParams = validUser();
      const user = await insertUser(userParams);
      const deviceId = 'b4b252a0-5cc6-446c-b124-365bd85cee90';

      const response = await request(app).post('/users/sign-in').send({
        username: user.username,
        password: userParams.password,
        deviceId,
      });

      expect(response.status).toEqual(200);
      const actualUser = response.body;

      expect(actualUser.id).toEqual(user.id);
      expect(actualUser.token.id).toMatch(UUID_REGEXP);
    });
  });
});
