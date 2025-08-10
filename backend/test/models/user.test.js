const mongoose = require('mongoose');
const User = require('../../Models/UserModel');
const bcrypt = require('bcryptjs');

describe('User Model - Unit Tests', () => {
  before(async function() {
    this.timeout(30000);
    await global.connectTestDB();
  });

  after(async function() {
    this.timeout(10000);
    await global.cleanupTestDB();
  });

  beforeEach(async function() {
    this.timeout(10000);
    
    // Ensure database is connected
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    await User.deleteMany({});
  });

  describe('User creation', () => {
    it('should create a user with valid data', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      const user = await User.create(userData);

      expect(user.email).to.equal(userData.email);
      expect(user.username).to.equal(userData.username);
      expect(user.password).to.not.equal(userData.password); // Should be hashed
      expect(user.createdAt).to.exist;
    });

    it('should hash password on save', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      const user = await User.create(userData);
      const isPasswordHashed = await bcrypt.compare(userData.password, user.password);
      
      expect(isPasswordHashed).to.be.true;
    });

    it('should not hash Google OAuth password', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'google-oauth-user',
        googleId: 'google123'
      };

      const user = await User.create(userData);
      
      expect(user.password).to.equal('google-oauth-user');
    });

    it('should require email', async function() {
      this.timeout(10000);
      
      const userData = {
        username: 'testuser',
        password: 'password123'
      };

      try {
        await User.create(userData);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.errors.email).to.exist;
      }
    });

    it('should require unique email', async function() {
      this.timeout(10000);
      
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      };

      await User.create(userData);

      try {
        await User.create(userData);
        expect.fail('Should have thrown duplicate key error');
      } catch (error) {
        expect(error.code).to.equal(11000);
      }
    });
  });

  describe('Password reset functionality', () => {
    let user;

    beforeEach(async function() {
      this.timeout(10000);
      
      user = await User.create({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      });
    });

    it('should store OTP and expiration', async function() {
      this.timeout(10000);
      
      const otp = '123456';
      const expires = new Date(Date.now() + 10 * 60 * 1000);

      user.resetPasswordOTP = otp;
      user.resetPasswordExpires = expires;
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.resetPasswordOTP).to.equal(otp);
      expect(updatedUser.resetPasswordExpires).to.exist;
    });

    it('should clear OTP after use', async function() {
      this.timeout(10000);
      
      user.resetPasswordOTP = '123456';
      user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      user.resetPasswordOTP = null;
      user.resetPasswordExpires = null;
      user.password = 'newpassword123';
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.resetPasswordOTP).to.be.null;
      expect(updatedUser.resetPasswordExpires).to.be.null;
    });
  });
});