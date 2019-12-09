import { expect } from 'chai';
import { agent as request } from 'supertest';
import { app } from '../src/index';

interface StaticEnvType {
  ip: string;
  email: string;
  phone: string;
}

const staticEnv: StaticEnvType = {
  ip: '192.168.7.39',
  email: 'j1@j.com',
  phone: '0992222222',
};

describe('Get user by id', () => {
  it('should get /user/:id', async () => {
    const res = await request(app).get('/user/1')
      .set('X-Forwarded-For', staticEnv.ip);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('Create user without error', () => {
  it('should status 201 for new user, 409 for existing', async () => {
    const res = await request(app).post('/user/create').send({
      username: 'john',
      password: '123456',
      email: staticEnv.email,
      phone: staticEnv.phone,
    })
      .type('application/json');
    expect(res.status).to.equal(409);
  });
});

describe('Auth user with email, password', () => {
  it('should be status 200', async () => {
    const res = await request(app).post('/user/auth').send({
      email: staticEnv.email,
      password: '123456',
    })
      .type('application/json');
    expect(res.status).to.equal(200);
  });
});

describe('Add new credential', () => {
  it('should be status 200 or 208 if already exist', async () => {
    const res = await request(app).post('/credentials/add').send({
      ip: staticEnv.ip,
      domain: 'testdomain',
      project: 'testproject',
    })
      .set('X-Forwarded-For', staticEnv.ip)
      .type('application/json');
    expect(res.status).to.equal(208);
  });
});

describe('Paginate users', () => {
  it('sould be status 200', async () => {
    const res = await request(app).get('/users/5/1')
      .set('X-Forwarded-For', staticEnv.ip)
      .type('application/json');
    expect(res.status).to.equal(200);
  });
});
