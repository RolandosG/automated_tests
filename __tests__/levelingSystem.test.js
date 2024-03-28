jest.mock('../src/database/userDB', () => ({
    // Mock any functions from userDB that are used in levelingSystem
    updateUserData: jest.fn(),
  }));
  
  import { getExpGained, getTotalExpForLevel, applyExpGainAndLevelUp, calculateExpMultiplier, calculateLevel, calculateExpGained } from '../src/services/levelingSystem';
 
  describe('Leveling System', () => {
    // Test for calculateExpGained
    it('should correctly calculate EXP gained based on study time', () => {
      const studyTimeMinutes = 60;
      const expectedExpGained = 60; // 60 minutes * 1 EXP per minute
      const actualExpGained = calculateExpGained(studyTimeMinutes);
      expect(actualExpGained).toBe(expectedExpGained);
    });
  
    // Test for getTotalExpForLevel
    it('should correctly calculate total EXP needed for a level', () => {
      const level = 5;
      const expectedTotalExp = 183; // Adjust this based on your formula
      const actualTotalExp = getTotalExpForLevel(level);
      expect(actualTotalExp).toBe(expectedTotalExp);
    });
  
    // Test for getExpGained with streak bonus
    it('should correctly calculate EXP gained with streak bonus', () => {
      const studyTimeMinutes = 60;
      const streakBonus = 2;
      const expectedExpGained = 720; // 60 minutes * 6 EXP per minute * 2 streak bonus
      const actualExpGained = getExpGained(studyTimeMinutes, streakBonus);
      expect(actualExpGained).toBe(expectedExpGained);
    });
  
    // Test for calculateLevel
    it('should correctly calculate the level based on EXP', () => {
      const exp = 200;
      const expectedLevel = 5; // Adjust this based on your formula
      const actualLevel = calculateLevel(exp);
      expect(actualLevel).toBe(expectedLevel);
    });
  
    // Test for calculateExpMultiplier
    it('should correctly calculate EXP multiplier based on session counter', () => {
      const sessionCounter = 10;
      const expectedMultiplier = 2; // 1 + (10 / 2) * 0.2
      const actualMultiplier = calculateExpMultiplier(sessionCounter);
      expect(actualMultiplier).toBe(expectedMultiplier);
    });
  
    // Test for applyExpGainAndLevelUp (mocking updateUserData)
    it('should correctly update the user\'s level and experience', async () => {
      const userData = { exp: 90, level: 1 };
      const sessionCounter = 5;
      const updatedUserData = await applyExpGainAndLevelUp(userData, sessionCounter);
      expect(updatedUserData.level).toBeGreaterThan(userData.level); // Check that the level has increased
      expect(updatedUserData.exp).toBeGreaterThanOrEqual(0); // Check that EXP is not negative
    });
  });