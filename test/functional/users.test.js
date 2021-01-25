import request from 'supertest';

import app from 'app';
import { User } from '../../app/user';
import { validUser } from '../helpers/factories/users';
import '../helpers/dbTransaction';

describe('Template configs endpoints', () => {
  describe('POST /users/sign-up', () => {
    it('responds with 201 the, created user and the new token', async () => {
      const body = validUser();
      const deviceId = 'b4b252a0-5cc6-446c-b124-365bd85cee90';
      const response = await request(app)
        .post('/users/sign-up')
        .send({ ...body, deviceId });

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          id: expect.stringMatching(/^(\w{8}-\w{4}-\w{4}-\w{4}-\w{12}){1}$/),
          token: expect.objectContaining({
            id: expect.stringMatching(/^(\w{8}-\w{4}-\w{4}-\w{4}-\w{12}){1}$/),
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
});
