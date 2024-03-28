// __mocks__/react-native-sqlite-storage.js
const mockExecuteSql = jest.fn((sql, params, successCallback, errorCallback) => {
  // Mock the behavior of executeSql here, e.g., call successCallback with mock results
  const mockResults = {
    rows: {
      length: 1,
      item: jest.fn().mockReturnValue({ /* mock row data */ }),
    },
  };
  if (successCallback) {
    successCallback(mockTransaction, mockResults);
  }
});

const mockTransaction = {
  executeSql: mockExecuteSql,
};

const mockOpenDatabase = jest.fn(() => ({
  transaction: jest.fn((callback) => {
    callback(mockTransaction);
  }),
}));

export default {
  openDatabase: mockOpenDatabase,
};
