/* eslint-env jest */
const Reddit = require('./index');
const { SUBREDDITS } = require('../../data/constants');
const { REDDIT_OUTPUT, YOUTUBE_IDS_OUTPUT } = require('../../__mocks__')

describe('Reddit', () => {
  it('Subreddits are returned', () => {
    expect(Reddit.getSubreddits()).toBe(SUBREDDITS)
  })
  it('Parse ids returns an expected result', () => {
    expect(Reddit.parseIds(REDDIT_OUTPUT)).toMatchObject(YOUTUBE_IDS_OUTPUT)
  })
})
