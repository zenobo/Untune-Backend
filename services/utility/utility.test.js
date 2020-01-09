/* eslint-env jest */
const Utility = require('./index');
const { UTIL_DATE, UTIL_DATE_TEXT } = require('../../__mocks__');

describe('Utility', () => {
  it('Returns the correct date', () => {
    expect(Utility.getDate(new Date(UTIL_DATE))).toBe(UTIL_DATE_TEXT)
  })
})
