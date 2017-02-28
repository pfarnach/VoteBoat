const superSession = require('supertest-session');

const app = require('../server.config');

describe('Route: /api/poll', () => {
  let session;
  let pollId;
  let pollChoiceId1;
  let pollChoiceId2;

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
          pollChoices: ['choice1', 'choice2', 'choice3']
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to create a poll w/ only 1 choice', done => {
      session
        .post('/api/poll')
        .send({
          title: 'my title',
          description: 'my description',
          pollType: 'fptp',
          pollChoices: ['choice1']
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to create a poll w/ only non-string choices', done => {
      session
        .post('/api/poll')
        .send({
          title: 'my title',
          description: 'my description',
          pollType: 'fptp',
          pollChoices: ['choice1', 'choice2', 3]
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
          pollChoices: ['choice1', 'choice2', 'choice3']
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          pollId = res.body.id;
          pollChoiceId1 = res.body.pollChoices[0].id;
          pollChoiceId2 = res.body.pollChoices[1].id;
          done();
        });
    });
  });

  describe('/:pollId/vote', () => {
    it('should not be able to cast vote with no choices', done => {
      session
        .post(`/api/poll/${pollId}/vote`)
        .send({
          votes: [
            // { pollChoiceId }
          ]
        })
        .expect(400)
        .end(done);
    });

    it('should not be able to cast vote with invalid pollChoiceId', done => {
      session
        .post(`/api/poll/${pollId}/vote`)
        .send({
          votes: [
            { pollChoiceId: 9123512317 }
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
            { pollChoiceId: pollChoiceId1 },
            { pollChoiceId: pollChoiceId2 }
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
            { pollChoiceId: pollChoiceId1 }
          ]
        })
        .expect(201)
        .end(done);
    });
  });
});