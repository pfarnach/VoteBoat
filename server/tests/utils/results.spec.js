const { expect } = require('chai');

const { pollTypes } = require('../../keywords');
const { results } = require('../../utils');


describe('util: results', () => {
  describe('countResults', () => {
    let mockPoll;

    beforeEach(() => {
      mockPoll = {
        pollType: pollTypes.fptp,
        pollChoices: [
          {
            id: 1,
            title: 'choice1',
            votes: [{ id: 1, score: 1}, { id: 2, score: 3}, { id: 3, score: 5}]
          },
          {
            id: 2,
            title: 'choice2',
            votes: [{ id: 4, score: 2}]
          }
        ]
      };
    });

    it('should throw an error for an unknown poll type', () => {
      mockPoll.pollType = 'foo';

      // expect()
      expect(results.countResults.bind(null, mockPoll))
        .to
        .throw(Error, /Unknown poll type/);
    });

    it('should correctly calculate the reuslts of a FPTP poll', () => {
      const expectedPollResults = {
        "count": {
          "1": {
            title: "choice1",
            total: 3
          },
          "2": {
            title: "choice2",
            total: 1
          }
        },
        "totalVotesCast": 4
      };

      const pollResults = results.countResults(mockPoll);

      expect(pollResults).to.deep.equal(expectedPollResults);
    });

    it('should correctly calculate the reuslts of a scored poll', () => {
      const expectedPollResults = {
        "count": {
          "1": {
            title: "choice1",
            total: 9
          },
          "2": {
            title: "choice2",
            total: 2
          }
        },
        "totalVotesCast": 4
      };

      mockPoll.pollType = pollTypes.scored;

      const pollResults = results.countResults(mockPoll);

      expect(pollResults).to.deep.equal(expectedPollResults);
    });
  });
});
