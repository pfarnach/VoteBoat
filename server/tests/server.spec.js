const superSession = require('supertest-session');

const app = require('../server');

describe('Route: / (index route)', () => {
  let session;

  beforeEach(() => {
    session = superSession(app);
  });

  it('should return index.html', done => {
    session
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end(done);
  });

  it('should still return index.html if route not picked up by other routes', done => {
    session
      .get('/randomletters123123')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end(done);
  });
});
