// backend/test/setup.js - Using your Atlas database with test collection
const mongoose = require('mongoose');
const { expect } = require('chai');
const sinon = require('sinon');

// Load test environment variables
require('dotenv').config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';

// Global test utilities
global.expect = expect;
global.sinon = sinon;

// Database connection helper
global.connectTestDB = async () => {
  try {
    // Use your existing Atlas connection but with a test database name
    const baseUrl = 'mongodb://hammadmalik40a:1234@cluster0-shard-00-00.hg5o6.mongodb.net:27017,cluster0-shard-00-01.hg5o6.mongodb.net:27017,cluster0-shard-00-02.hg5o6.mongodb.net:27017';
    const testDbName = 'notes_app_test';
    const mongoUrl = `${baseUrl}/${testDbName}?replicaSet=atlas-145jhd-shard-0&ssl=true&authSource=admin`;
    
    console.log('Connecting to Atlas test database...');
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
        maxPoolSize: 10,
        minPoolSize: 5,
      });
      console.log('✓ Connected to Atlas test database');
    }
  } catch (error) {
    console.error('Failed to connect to test database:', error.message);
    throw error;
  }
};

// Database cleanup helper
global.cleanupTestDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Get all collections in the test database
      const collections = await mongoose.connection.db.listCollections().toArray();
      
      // Drop each collection instead of the entire database (safer for Atlas)
      for (let collection of collections) {
        await mongoose.connection.db.dropCollection(collection.name);
      }
      
      await mongoose.connection.close();
      console.log('✓ Cleaned test database and closed connection');
    }
  } catch (error) {
    console.error('Failed to cleanup test database:', error);
    // Don't throw error on cleanup failure
  }
};