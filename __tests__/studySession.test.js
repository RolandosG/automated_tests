jest.mock('../__mocks__/react-native-sqlite-storage.js');
import { saveSessionSummary, updateUserSession } from '../src/services/studySessions';
import { db } from '../src/database/userDB';

describe('Study session services', () => {
  // Test for saveSessionSummary function
  it('saveSessionSummary should save session summary data in the database', (done) => {
    const userId = 1;
    const summary = 'Test summary';
    const sessionDate = '2023-03-30';

    saveSessionSummary(userId, summary, sessionDate, (success) => {
      expect(success).toBe(true);
      done();
    });
  });

  // Test for updateUserSession function
  it('updateUserSession should update user session data in the database', (done) => {
    const userId = 1;
    const newExp = 200;
    const newTotalStudyTime = 90;
    const newTotalBreakTime = 30;

    // Mock transaction object for testing updateUserSession
    const mockTransaction = {
      executeSql: jest.fn((sql, params, successCallback, errorCallback) => {
        // Mock success scenario
        if (successCallback) {
          successCallback();
        }
      }),
    };

    updateUserSession(mockTransaction, userId, newExp, newTotalStudyTime, newTotalBreakTime, (success) => {
      expect(success).toBe(true);
      expect(mockTransaction.executeSql).toHaveBeenCalledWith(
        'UPDATE user_table SET exp = ?, total_study_time = ?, total_break_time = ? WHERE id = ?',
        [newExp, newTotalStudyTime, newTotalBreakTime, userId],
        expect.any(Function),
        expect.any(Function)
      );
      done();
    });
  });
});
