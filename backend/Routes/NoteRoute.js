const express = require('express');
const { 
  createNote, 
  getNotes, 
  getNote, 
  updateNote, 
  deleteNote, 
  toggleStar, 
  toggleArchive,
  getNoteStats
} = require('../Controllers/NoteController');
const { requireAuth } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

// Apply authentication middleware to all note routes
router.use(requireAuth);

// GET /api/notes - Get all notes for user (with filtering, sorting, search)
router.get('/', getNotes);

// GET /api/notes/stats - Get user's note statistics
router.get('/stats', getNoteStats);

// POST /api/notes - Create a new note
router.post('/', createNote);

// GET /api/notes/:noteId - Get a specific note
router.get('/:noteId', getNote);

// PUT /api/notes/:noteId - Update a note
router.put('/:noteId', updateNote);

// DELETE /api/notes/:noteId - Delete a note
router.delete('/:noteId', deleteNote);

// PATCH /api/notes/:noteId/star - Toggle star status
router.patch('/:noteId/star', toggleStar);

// PATCH /api/notes/:noteId/archive - Toggle archive status
router.patch('/:noteId/archive', toggleArchive);

module.exports = router;