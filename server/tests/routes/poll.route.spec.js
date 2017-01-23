const superSession = require('supertest-session');

const app = require('../../server');

describe('Route: /api/poll', () => {
  let session;
  let pollId;
  let pollOptionId1;
  let pollOptionId2;

  beforeEach(() => {
    session = superSession(app);
  });

  describe('/', () => {
    it('should not be able to create a poll w/o a title', done => {
      session
        .post('/api/poll')
        .send({
          description: 'my description3!',
          pollType: 'fptp',
          pollOptions: ['opt1', 'opt2', 'opt3']
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to create a poll w/ only 1 option', done => {
      session
        .post('/api/poll')
        .send({
          title: 'my title',
          description: 'my description',
          pollType: 'fptp',
          pollOptions: ['opt1']
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to create a poll w/ only non-string options', done => {
      session
        .post('/api/poll')
        .send({
          title: 'my title',
          description: 'my description',
          pollType: 'fptp',
          pollOptions: ['opt1', 'opt2', 3]
        })
        .expect(400)
        .end(done);
    });

    it('should create a poll', done => {
      session
        .post('/api/poll')
        .send({
          title: 'my title',
          description: 'my description',
          pollType: 'fptp',
          pollOptions: ['opt1', 'opt2', 'opt3']
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          pollId = res.body.id;
          pollOptionId1 = res.body.pollOptions[0].id;
          pollOptionId2 = res.body.pollOptions[1].id;
          done();
        });
    });
  });

  describe('/:pollId/vote', () => {
    it('should not be able to cast vote with no options', done => {
      session
        .post(`/api/poll/${pollId}/vote`)
        .send({
          votes: [
            // { pollOptionId }
          ]
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to cast vote with invalid pollOptionId', done => {
      session
        .post(`/api/poll/${pollId}/vote`)
        .send({
          votes: [
            { pollOptionId: 9123512317 }
          ]
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to cast vote with 2 choices (for FPTP)', done => {
      session
        .post(`/api/poll/${pollId}/vote`)
        .send({
          votes: [
            { pollOptionId: pollOptionId1 },
            { pollOptionId: pollOptionId2 }
          ]
        })
        .expect(400)
        .end(done);
    });

    it('should cast vote with 1 valid choice', done => {
      session
        .post(`/api/poll/${pollId}/vote`)
        .send({
          votes: [
            { pollOptionId: pollOptionId1 }
          ]
        })
        .expect(201)
        .end(done);
    });
  });
});