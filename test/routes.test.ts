import { expect } from 'chai';
import { agent as request } from 'supertest';
import { app } from '../src/index';

describe('Get user by id', () => {
  it('should get /user/:id', async () => {
    const res = await request(app).get('/user/1')
      .set('X-Forwarded-For', '192.168.7.39');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('Create user without error', () => {
  it('should status 201 for new user, 409 for existing', async () => {
    const res = await request(app).post('/user/create').send({
      username: 'john',
      password: '123456',
      email: 'j2@j.com',
      phone: '0992112222',
    })
      .type('application/json');
    expect(res.status).to.equal(409);
  });
});

describe('Auth user with email, password', () => {
  it('should be status 200', async () => {
    const res = await request(app).post('/user/auth').send({
      email: 'j2@j.com',
      password: '123456',
    })
      .type('application/json');
    expect(res.status).to.equal(200);
  });
});
