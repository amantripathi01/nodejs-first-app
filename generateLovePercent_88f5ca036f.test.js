// Test generated by RoostGPT for test ExpressJs using AI Type Open AI and AI Model gpt-4

import { generateLovePercent } from './features';

describe('Testing generateLovePercent function', () => {
  test('should return a string', () => {
    expect(typeof generateLovePercent()).toBe('string');
  });

  test('should return a percentage', () => {
    expect(generateLovePercent()).toMatch(/%\$/);
  });

  test('should return a value between 0% and 100%', () => {
    const percent = parseInt(generateLovePercent().replace('%', ''));
    expect(percent).toBeGreaterThanOrEqual(0);
    expect(percent).toBeLessThanOrEqual(100);
  });
});
