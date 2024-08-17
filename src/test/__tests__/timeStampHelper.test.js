import { formatTimestamp } from '../../utils/timestampHelper';
import { isMobile } from '../../utils/screenSizeHelper';

jest.mock('../../utils/screenSizeHelper', () => ({
  isMobile: jest.fn(),
}));

describe('formatTimestamp', () => {
  beforeEach(() => {
    isMobile.mockReset();
  });

  describe('should format timestamp correctly', () => {
    it('given isMobile is true, it should format timestamp as DD-MM-YY HH:MM am/pm', () => {
      isMobile.mockReturnValue(true);
      const timestamp = 1723872775;
      const expected = '17-08-24 01:32 pm';

      const result = formatTimestamp(timestamp);

      expect(result).toBe(expected);
    });

    it('given isMobile is false, it should format timestamp as DD-MM-YYYY HH:MM am/pm', () => {
      isMobile.mockReturnValue(false);
      const timestamp = 1723872775;
      const expected = '17-08-2024 01:32 pm';

      const result = formatTimestamp(timestamp);

      expect(result).toBe(expected);
    });
  });

  it('should handle single digit day and month correctly', () => {
    isMobile.mockReturnValue(false);
    const timestamp = 1723095320;
    const expected = '08-08-2024 01:35 pm';

    const result = formatTimestamp(timestamp);

    expect(result).toBe(expected);
  });

  it('should handle midnight correctly', () => {
    isMobile.mockReturnValue(false);
    const timestamp = 1723046400;
    const expected = '08-08-2024 12:00 am';

    const result = formatTimestamp(timestamp);

    expect(result).toBe(expected);
  });
});
