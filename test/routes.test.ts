import { expect } from 'chai';
import { agent as request } from 'supertest';
import { app } from '../src/index';
import { randomInt } from './helpers/helper';


interface RandomUserType {
  email: string;
  phone: string;
}

const randomUser: RandomUserType = {
  email: `j${randomInt()}@j.com`,
  phone: `099${randomInt()}`,
};

describe('Create user without error', () => {
  it('should status 201 for new user, 409 for existing', async () => {
    const res = await request(app).post('/user/create').send({
      username: 'john',
      password: '123456',
      email: randomUser.email,
      phone: randomUser.phone,
    })
      .type('application/json');
    expect(res.status).to.equal(201);
    expect(res.body).to.be.eql({ msg: 'user created' });
  });
});

// describe('Auth user with email, password', () => {
//   it('should be status 200', async () => {
//     const res = await request(app).post('/user/login').send({
//       email: staticEnv.email,
//       password: '123456',
//     })
//       .type('application/json');
//     expect(res.status).to.equal(200);
//   });
// });

// cookie > set in supertest
// describe('Get authorized user profile', () => {
//   it('should be status 200', async () => {
//     const res = await request(app).get('/user/profile');
//     expect(res.status).to.equal(200);
//   });
// });

// describe('Add new credential', () => {
//   it('should be status 200 or 208 if already exist', async () => {
//     const res = await request(app).post('/credentials/add').send({
//       ip: staticEnv.ip,
//       domain: 'testdomain',
//       project: 'testproject',
//     })
//       .set('X-Forwarded-For', staticEnv.ip)
//       .type('application/json');
//     expect(res.status).to.equal(208);
//   });
// });

// describe('Paginate users', () => {
//   it('should be status 200', async () => {
//     const res = await request(app).get('/users/5/1')
//       .set('X-Forwarded-For', staticEnv.ip)
//       .type('application/json');
//     expect(res.status).to.equal(200);
//   });
// });
