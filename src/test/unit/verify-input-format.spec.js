import { verifyInputDateFormat } from '../../utils/verification';

const TEST_CASES = [
  {
    input: '',
    expect: false
  },
  {
    input: '2021-11-15T00:00:00+08:00',
    expect: true
  },
  {
    input: '2021-11-15T00:00:00Z',
    expect: true
  },
  {
    input: '2021-11-15T00:00:00',
    expect: true
  },
  {
    input: '11-15T00:00:00+08:00',
    expect: false
  },
  {
    input: '2021-11-15 00:00:00+08:00',
    expect: false
  },
  {
    input: '2021-11-15T',
    expect: false
  },
  {
    input: '0000-00-00Y00:00:00+08:00',
    expect: false
  },
  {
    input: '2021-13-01Y00:00:00+08:00',
    expect: false
  },
];

describe('Test input date format is valid', () => {
  it('should input date format valid', () => {
    console.error = jest.fn()

    TEST_CASES.forEach(e => expect(verifyInputDateFormat(e.input)).toBe(e.expect));
  });
});
