// backend/test/database.test.js
const mongoose = require('mongoose');

describe('Database Connection Test', () => {
  before(async function() {
    this.timeout(30000); // 30 seconds for database connection
    console.log('Testing database connection...');
    
    // Connect to the test database
    await global.connectTestDB();
  });

  after(async function() {
    this.timeout(10000);
    await global.cleanupTestDB();
  });

  it('should connect to test database', function() {
    expect(mongoose.connection.readyState).to.equal(1); // 1 = connected
    console.log('✓ Database connection successful');
  });

  it('should have access to expect globally', function() {
    expect(1 + 1).to.equal(2);
  });

  it('should have access to sinon globally', function() {
    expect(sinon).to.exist;
  });

  it('should be in test environment', function() {
    expect(process.env.NODE_ENV).to.equal('test');
  });

  it('should have TOKEN_KEY set', function() {
    expect(process.env.TOKEN_KEY).to.exist;
    expect(process.env.TOKEN_KEY).to.not.be.empty;
  });

  it('should be connected to test database', function() {
    const dbName = mongoose.connection.db.databaseName;
    expect(dbName).to.equal('notes_app_test');
    console.log(`✓ Connected to test database: ${dbName}`);
  });
});