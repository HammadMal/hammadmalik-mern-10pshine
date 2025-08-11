// backend/test/setup.js - Fixed version
const mongoose = require('mongoose');
const { expect } = require('chai');
const sinon = require('sinon');

// Load test environment variables FIRST
require('dotenv').config({ path: '.env.test' });
require('dotenv').config(); // Fallback to main .env

// Set test environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';

// Ensure TOKEN_KEY is set for tests
if (!process.env.TOKEN_KEY) {
  process.env.TOKEN_KEY = 'test_secret_key_for_jwt';
}

// Global test utilities
global.expect = expect;
global.sinon = sinon;

// Track connection state
let isConnected = false;

// Database connection helper
global.connectTestDB = async () => {
  try {
    // If already connected, just return
    if (isConnected && mongoose.connection.readyState === 1) {
      console.log('✓ Already connected to Atlas test database');
      return;
    }

    // Close existing connection if any
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    // Use your existing Atlas connection but with a test database name
    const baseUrl = 'mongodb://hammadmalik40a:1234@cluster0-shard-00-00.hg5o6.mongodb.net:27017,cluster0-shard-00-01.hg5o6.mongodb.net:27017,cluster0-shard-00-02.hg5o6.mongodb.net:27017';
    const testDbName = 'notes_app_test';
    const mongoUrl = `${baseUrl}/${testDbName}?replicaSet=atlas-145jhd-shard-0&ssl=true&authSource=admin`;
    
    console.log('Connecting to Atlas test database...');
    
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
    });
    
    isConnected = true;
    console.log('✓ Connected to Atlas test database');
  } catch (error) {
    console.error('Failed to connect to test database:', error.message);
    isConnected = false;
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
        try {
          await mongoose.connection.db.dropCollection(collection.name);
        } catch (err) {
          // Ignore errors if collection doesn't exist
          if (err.code !== 26) {
            console.warn(`Warning: Could not drop collection ${collection.name}:`, err.message);
          }
        }
      }
      
      await mongoose.connection.close();
      isConnected = false;
      console.log('✓ Cleaned test database and closed connection');
    }
  } catch (error) {
    console.error('Failed to cleanup test database:', error);
    isConnected = false;
  }
};

// Note: Individual test files should handle their own before/after hooks
// This setup file only provides utilities and global configurations