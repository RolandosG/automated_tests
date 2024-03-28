import { getTaskScreenName } from '../src/components/taskController/taskController';

describe('getTaskScreenName', () => {
  it('should return the correct screen name for a fantasy era Wizard/Witch', () => {
    const era = 'fantasy';
    const userClass = 'Wizard/Witch';
    const expectedScreenName = 'Arcane Sanctum';
    const actualScreenName = getTaskScreenName(era, userClass);
    expect(actualScreenName).toBe(expectedScreenName);
  });

  it('should return the correct screen name for a modern era Entrepreneur', () => {
    const era = 'modern';
    const userClass = 'Entrepreneur';
    const expectedScreenName = 'Innovation Hub';
    const actualScreenName = getTaskScreenName(era, userClass);
    expect(actualScreenName).toBe(expectedScreenName);
  });

  // Add more test cases for different eras and classes
});
