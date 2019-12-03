import { expect } from 'chai';
import { agent as request } from 'supertest';
import { app } from '../src/index';

describe('Get user by id', () => {
  it('should get /user/:id', async () => {
    const res = await request(app).get('/user/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('Create user without error', () => {
  it('should status 201', async () => {
    const res = await request(app).post('/user/create');
    expect(res.status).to.equal(201);
  });
});
