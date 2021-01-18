import request from 'supertest';

import app from 'app';
import { User } from '../../app/user';
import { validUser } from '../helpers/factories/users';
import '../helpers/dbTransaction';

describe('Template configs endpoints', () => {
  describe('POST /users/sign-up', () => {
    it('responds with 201 and the created user', async () => {
      const body = validUser();

      const response = await request(app).post('/users/sign-up').send(body);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject({
        id: expect.stringMatching(/^(\w{8}-\w{4}-\w{4}-\w{4}-\w{12}){1}$/),
      });
    });

    it("doesn't store the user's password in plain text", async () => {
      const body = validUser();

      const response = await request(app).post('/users/sign-up').send(body);

      expect(response.status).toEqual(201);
      const createdUser = await User.query().first();
      expect(createdUser).toBeDefined();
      expect(createdUser.password).not.toEqual(body.password);
    });
  });
});
