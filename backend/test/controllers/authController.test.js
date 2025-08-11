const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../Models/UserModel');
const { Signup, Login } = require('../../Controllers/AuthController');
const cookieParser = require('cookie-parser');

describe('Auth Controller - Unit Tests', () => {
  let app;

  // Connect to database before all tests in this suite
  before(async function() {
    this.timeout(30000); // 30 second timeout
    await global.connectTestDB();
    
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use(cookieParser());
    
    // Add routes
    app.post('/signup', Signup);
    app.post('/login', Login);
  });

  // Clean up after all tests in this suite
  after(async function() {
    this.timeout(10000);
    await global.cleanupTestDB();
  });

  beforeEach(async function() {
    this.timeout(10000);
    // Clean users collection - only if connected
    if (mongoose.connection.readyState === 1) {
      await User.deleteMany({});
    } else {
      throw new Error('Database not connected');
    }
  });

  describe('POST /signup', () => {
    it('should create a new user successfully', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/signup')
        .send(userData)
        .expect(201);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('User signed in successfully');
      expect(response.body.user).to.have.property('email', userData.email);
      
      // Verify user was created in database
      const user = await User.findOne({ email: userData.email });
      expect(user).to.exist;
      expect(user.username).to.equal(userData.username);
    });

    it('should return error for existing user', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      // Create user first
      await User.create(userData);

      const response = await request(app)
        .post('/signup')
        .send(userData)
        .expect(200);

      expect(response.body.message).to.equal('User already exists');
    });

    it('should hash password before saving', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      await request(app)
        .post('/signup')
        .send(userData)
        .expect(201);

      const user = await User.findOne({ email: userData.email });
      expect(user.password).to.not.equal(userData.password);
      
      // Verify password is hashed
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);
      expect(isPasswordValid).to.be.true;
    });
  });

  describe('POST /login', () => {
    let testUserData;

    beforeEach(async function() {
      this.timeout(10000);
      
      testUserData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      // Create a test user using the User.create method
      // This will trigger the pre-save hook to hash the password properly
      await User.create({
        email: testUserData.email,
        username: testUserData.username,
        password: testUserData.password // Let the model hash this
      });
    });

    it('should login with valid credentials', async function() {
      this.timeout(10000);
      
      const loginData = {
        email: testUserData.email,
        password: testUserData.password
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('User logged in successfully');
      
      // Check if cookie is set
      expect(response.headers['set-cookie']).to.exist;
      expect(response.headers['set-cookie'][0]).to.include('token=');
    });

    it('should reject invalid email', async function() {
      this.timeout(10000);
      
      const loginData = {
        email: 'nonexistent@example.com',
        password: testUserData.password
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Incorrect email or password');
    });

    it('should reject invalid password', async function() {
      this.timeout(10000);
      
      const loginData = {
        email: testUserData.email,
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Incorrect email or password');
    });

    it('should reject missing credentials', async function() {
      this.timeout(10000);
      
      const response = await request(app)
        .post('/login')
        .send({})
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('All fields are required');
    });

    it('should handle Google OAuth users', async function() {
      this.timeout(10000);
      
      // Create Google OAuth user
      await User.create({
        email: 'google@example.com',
        username: 'googleuser',
        password: 'google-oauth-user',
        googleId: 'google123'
      });

      const loginData = {
        email: 'google@example.com',
        password: 'somepassword'
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Please use Google Sign In for this account');
    });
  });
});