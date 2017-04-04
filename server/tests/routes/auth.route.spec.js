const superSession = require('supertest-session');

const app = require('../server.config');

describe('Route: /api/auth', () => {
  let session;
  let authedSession;

  beforeEach(() => {
    session = superSession(app);
  });

  it('should not be able to signout yet', done => {
    session
      .get('/api/auth/signout')
      .expect(401)
      .end(done);
  });

  it('should create a user and get authenticated', done => {
    session
      .post('/api/auth/signup')
      .send({ email: `${Math.random()}@test.com`, password: 'password' })
      .expect(200)
      .end(err => {
        if (err) return done(err);

        authedSession = session;
        return done();
      });
  });

  it('should be able to signout', done => {
    authedSession
      .get('/api/auth/signout')
      .expect(200)
      .end(done);
  });
});