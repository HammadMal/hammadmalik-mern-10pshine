const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Note = require('../../Models/NoteModel');
const User = require('../../Models/UserModel');
const { 
  createNote, 
  getNotes, 
  getNote, 
  updateNote, 
  deleteNote,
  toggleStar,
  getNoteStats
} = require('../../Controllers/NoteController');
const { requireAuth } = require('../../Middlewares/AuthMiddleware');
const cookieParser = require('cookie-parser');

describe('Note Controller - Unit Tests', () => {
  let app;
  let testUser;
  let authToken;

  before(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use(cookieParser());
    
    // Add auth middleware and routes
    app.use('/api/notes', requireAuth);
    app.post('/api/notes', createNote);
    app.get('/api/notes', getNotes);
    app.get('/api/notes/stats', getNoteStats);
    app.get('/api/notes/:noteId', getNote);
    app.put('/api/notes/:noteId', updateNote);
    app.delete('/api/notes/:noteId', deleteNote);
    app.patch('/api/notes/:noteId/star', toggleStar);
  });

  beforeEach(async () => {
    // Clean collections
    await User.deleteMany({});
    await Note.deleteMany({});
    
    // Create test user
    testUser = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedPassword'
    });
    
    // Create auth token
    authToken = jwt.sign({ id: testUser._id }, process.env.TOKEN_KEY, {
      expiresIn: '1h'
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const noteData = {
        title: 'Test Note',
        content: 'This is a test note content',
        tags: ['test', 'note']
      };

      const response = await request(app)
        .post('/api/notes')
        .set('Cookie', [`token=${authToken}`])
        .send(noteData)
        .expect(201);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('Note created successfully');
      expect(response.body.note).to.have.property('title', noteData.title);
      expect(response.body.note).to.have.property('content', noteData.content);
      expect(response.body.note.userId.toString()).to.equal(testUser._id.toString());
    });

    it('should reject note without title', async () => {
      const noteData = {
        content: 'This is a test note content'
      };

      const response = await request(app)
        .post('/api/notes')
        .set('Cookie', [`token=${authToken}`])
        .send(noteData)
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Title and content are required');
    });

    it('should reject note without content', async () => {
      const noteData = {
        title: 'Test Note'
      };

      const response = await request(app)
        .post('/api/notes')
        .set('Cookie', [`token=${authToken}`])
        .send(noteData)
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Title and content are required');
    });

    it('should require authentication', async () => {
      const noteData = {
        title: 'Test Note',
        content: 'This is a test note content'
      };

      const response = await request(app)
        .post('/api/notes')
        .send(noteData)
        .expect(401);

      expect(response.body.success).to.be.false;
    });
  });

  describe('GET /api/notes', () => {
    beforeEach(async () => {
      // Create test notes
      await Note.create([
        {
          title: 'Note 1',
          content: 'Content 1',
          userId: testUser._id,
          isStarred: true
        },
        {
          title: 'Note 2',
          content: 'Content 2',
          userId: testUser._id,
          isStarred: false
        },
        {
          title: 'Note 3',
          content: 'Content 3',
          userId: testUser._id,
          isArchived: true
        }
      ]);
    });

    it('should return user notes', async () => {
      const response = await request(app)
        .get('/api/notes')
        .set('Cookie', [`token=${authToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.notes).to.have.length(2); // Excluding archived
      expect(response.body.pagination).to.exist;
    });

    it('should filter starred notes', async () => {
      const response = await request(app)
        .get('/api/notes?filter=starred')
        .set('Cookie', [`token=${authToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.notes).to.have.length(1);
      expect(response.body.notes[0].isStarred).to.be.true;
    });

    it('should filter archived notes', async () => {
      const response = await request(app)
        .get('/api/notes?filter=archived')
        .set('Cookie', [`token=${authToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.notes).to.have.length(1);
      expect(response.body.notes[0].isArchived).to.be.true;
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/notes')
        .expect(401);
    });
  });

  describe('PUT /api/notes/:noteId', () => {
    let testNote;

    beforeEach(async () => {
      testNote = await Note.create({
        title: 'Original Title',
        content: 'Original Content',
        userId: testUser._id
      });
    });

    it('should update note successfully', async () => {
      const updateData = {
        title: 'Updated Title',
        content: 'Updated Content'
      };

      const response = await request(app)
        .put(`/api/notes/${testNote._id}`)
        .set('Cookie', [`token=${authToken}`])
        .send(updateData)
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.note.title).to.equal(updateData.title);
      expect(response.body.note.content).to.equal(updateData.content);
    });

    it('should reject invalid note ID', async () => {
      const response = await request(app)
        .put('/api/notes/invalid-id')
        .set('Cookie', [`token=${authToken}`])
        .send({ title: 'Updated' })
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Invalid note ID');
    });

    it('should reject note not owned by user', async () => {
      // Create another user's note
      const otherUser = await User.create({
        email: 'other@example.com',
        username: 'otheruser',
        password: 'password'
      });

      const otherNote = await Note.create({
        title: 'Other Note',
        content: 'Other Content',
        userId: otherUser._id
      });

      const response = await request(app)
        .put(`/api/notes/${otherNote._id}`)
        .set('Cookie', [`token=${authToken}`])
        .send({ title: 'Hacked' })
        .expect(404);

      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal('Note not found');
    });
  });

  describe('PATCH /api/notes/:noteId/star', () => {
    let testNote;

    beforeEach(async () => {
      testNote = await Note.create({
        title: 'Test Note',
        content: 'Test Content',
        userId: testUser._id,
        isStarred: false
      });
    });

    it('should toggle star status', async () => {
      const response = await request(app)
        .patch(`/api/notes/${testNote._id}/star`)
        .set('Cookie', [`token=${authToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.note.isStarred).to.be.true;
      expect(response.body.message).to.include('starred');
    });

    it('should toggle star status back to false', async () => {
      // First star it
      await request(app)
        .patch(`/api/notes/${testNote._id}/star`)
        .set('Cookie', [`token=${authToken}`]);

      // Then unstar it
      const response = await request(app)
        .patch(`/api/notes/${testNote._id}/star`)
        .set('Cookie', [`token=${authToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.note.isStarred).to.be.false;
      expect(response.body.message).to.include('unstarred');
    });
  });

  describe('GET /api/notes/stats', () => {
    beforeEach(async () => {
      // Create test notes with different properties
      await Note.create([
        {
          title: 'Note 1',
          content: 'Content 1',
          userId: testUser._id,
          isStarred: true,
          wordCount: 10
        },
        {
          title: 'Note 2',
          content: 'Content 2',
          userId: testUser._id,
          isStarred: true,
          isArchived: true,
          wordCount: 15
        },
        {
          title: 'Note 3',
          content: 'Content 3',
          userId: testUser._id,
          wordCount: 8
        }
      ]);
    });

    it('should return correct statistics', async () => {
      const response = await request(app)
        .get('/api/notes/stats')
        .set('Cookie', [`token=${authToken}`])
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.stats).to.have.property('totalNotes', 3);
      expect(response.body.stats).to.have.property('starredNotes', 2);
      expect(response.body.stats).to.have.property('archivedNotes', 1);
      expect(response.body.stats).to.have.property('totalWords', 33);
    });
  });
});