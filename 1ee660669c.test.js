// Jest Test Case

import { describe, expect, beforeAll, afterAll, test } from '@jest/globals';
import mongoose from 'mongoose';

describe('Database Connection', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017", {
        dbName: "backend"
      });
    } catch (e) {
      throw new Error(e);
    }
  });

  afterAll(async () => {
    try {
      await mongoose.disconnect();
    } catch (e) {
      throw new Error(e);
    }
  });

  test('should be connected to the database', async () => {
    const isConnected = mongoose.connection.readyState === 1;
    expect(isConnected).toBe(true);
  });

  test('should fail to connect to the database', async () => {
    try {
      await mongoose.disconnect();
      await mongoose.connect('mongodb://invalid:27017', {dbName: 'backend'});
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
