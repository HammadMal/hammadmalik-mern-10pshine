const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../Models/UserModel');
const { requireAuth, userVerification, optionalAuth } = require('../../Middlewares/AuthMiddleware');
const cookieParser = require('cookie-parser');

describe('Auth Middleware - Unit Tests', () => {
  let app;
  let testUser;
  let validToken;

  before(() => {
    app = express();
    app.use(cookieParser());
    app.use(express.json());
    
    // Test routes
    app.get('/protected', requireAuth, (req, res) => {
      res.json({ success: true, user: req.user });
    });
    
    app.post('/verify', userVerification);
    
    app.get('/optional', optionalAuth, (req, res) => {
      res.json({ success: true, user: req.user });
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
    
    testUser = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedPassword'
    });
    
    validToken = jwt.sign({ id: testUser._id }, process.env.TOKEN_KEY, {
      expiresIn: '1h'
    });
  });

  describe('requireAuth middleware', () => {
    it('should allow access with valid token', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Cookie', [`token=${validToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.user).to.have.property('email', testUser.email);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/protected')
        .expect(401);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Access denied. No token provided.');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Cookie', ['token=invalid-token'])
        .expect(401);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Invalid token.');
    });

    it('should reject request with expired token', async () => {
      const expiredToken = jwt.sign({ id: testUser._id }, process.env.TOKEN_KEY, {
        expiresIn: '-1h'
      });

      const response = await request(app)
        .get('/protected')
        .set('Cookie', [`token=${expiredToken}`])
        .expect(401);

      expect(response.body.success).to.be.false;
    });
  });

  describe('userVerification middleware', () => {
    it('should verify valid token', async () => {
      const response = await request(app)
        .post('/verify')
        .set('Cookie', [`token=${validToken}`])
        .expect(200);

      expect(response.body.status).to.be.true;
      expect(response.body.user).to.equal(testUser.username);
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .post('/verify')
        .set('Cookie', ['token=invalid'])
        .expect(200);

      expect(response.body.status).to.be.false;
    });

    it('should reject missing token', async () => {
      const response = await request(app)
        .post('/verify')
        .expect(200);

      expect(response.body.status).to.be.false;
    });
  });

  describe('optionalAuth middleware', () => {
    it('should set user with valid token', async () => {
      const response = await request(app)
        .get('/optional')
        .set('Cookie', [`token=${validToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.user).to.exist;
    });

    it('should allow access without token', async () => {
      const response = await request(app)
        .get('/optional')
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.user).to.be.null;
    });

    it('should set user to null with invalid token', async () => {
      const response = await request(app)
        .get('/optional')
        .set('Cookie', ['token=invalid'])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.user).to.be.null;
    });
  });
});