// userDB.test.js
const { loadUserData } = require('../src/database/userDB');

// Mock the react-native-sqlite-storage module
jest.mock('react-native-sqlite-storage', () => {
  const mockExecuteSql = jest.fn((sql, params, successCallback, errorCallback) => {
    const mockResults = {
      rows: {
        length: 1,
        item: jest.fn().mockReturnValue({ id: 1, username: 'TestUser' }),
      },
    };
    if (successCallback) {
      successCallback(mockTransaction, mockResults);
    }
  });

  const mockTransaction = {
    executeSql: mockExecuteSql,
  };

  return {
    openDatabase: jest.fn(() => ({
      transaction: jest.fn((callback) => {
        callback(mockTransaction);
      }),
    })),
  };
});

describe('Database operations', () => {
  it('should load user data', (done) => {
    loadUserData((userData) => {
      expect(userData).toEqual({ id: 1, username: 'TestUser' });
      done();
    });

    // Access the executeSql function from the mock transaction object
    const { openDatabase } = require('react-native-sqlite-storage');
    const db = openDatabase({ name: 'test.db' });
    db.transaction((tx) => {
      expect(tx.executeSql).toHaveBeenCalled(); // Check if executeSql was called
    });
  });
});
