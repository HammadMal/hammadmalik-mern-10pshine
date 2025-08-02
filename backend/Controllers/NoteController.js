const Note = require("../Models/NoteModel");
const mongoose = require("mongoose");

// Create a new note
module.exports.createNote = async (req, res) => {
  try {
    const { title, content, tags, isStarred, color } = req.body;
    const userId = req.user.id; // From authentication middleware

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }

    // Create new note
    const note = new Note({
      title: title.trim(),
      content,
      tags: tags || [],
      isStarred: isStarred || false,
      color: color || 'default',
      userId
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note
    });

  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create note"
    });
  }
};

// Get all notes for a user with filtering and sorting
module.exports.getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      page = 1, 
      limit = 20, 
      search, 
      filter = 'all', 
      sortBy = 'modifiedAt', 
      sortOrder = 'desc',
      tags 
    } = req.query;

    // Build query
    let query = { 
      userId,
      isArchived: false // By default, don't show archived notes
    };

    // Apply filters
    switch (filter) {
      case 'starred':
        query.isStarred = true;
        break;
      case 'recent':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query.modifiedAt = { $gte: weekAgo };
        break;
      case 'archived':
        query.isArchived = true;
        break;
      // 'all' is default - no additional filter
    }

    // Apply search
    if (search) {
      query.$text = { $search: search };
    }

    // Apply tag filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      query.tags = { $in: tagArray };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const notes = await Note.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limit);

    res.status(200).json({
      success: true,
      notes,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalNotes,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes"
    });
  }
};

// Get a single note by ID
module.exports.getNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID"
      });
    }

    const note = await Note.findOne({ 
      _id: noteId, 
      userId 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      note
    });

  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch note"
    });
  }
};

// Update a note
module.exports.updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;
    const { title, content, tags, isStarred, color } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID"
      });
    }

    // Find and update note
    const note = await Note.findOne({ 
      _id: noteId, 
      userId 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    // Update fields
    if (title !== undefined) note.title = title.trim();
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (isStarred !== undefined) note.isStarred = isStarred;
    if (color !== undefined) note.color = color;

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note
    });

  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update note"
    });
  }
};

// Delete a note
module.exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID"
      });
    }

    const note = await Note.findOneAndDelete({ 
      _id: noteId, 
      userId 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully"
    });

  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to delete note"
    });
  }
};

// Toggle star status
module.exports.toggleStar = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID"
      });
    }

    const note = await Note.findOne({ 
      _id: noteId, 
      userId 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    note.isStarred = !note.isStarred;
    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.isStarred ? 'starred' : 'unstarred'} successfully`,
      note: {
        _id: note._id,
        isStarred: note.isStarred
      }
    });

  } catch (error) {
    console.error('Toggle star error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle star"
    });
  }
};

// Toggle archive status
module.exports.toggleArchive = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID"
      });
    }

    const note = await Note.findOne({ 
      _id: noteId, 
      userId 
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.isArchived ? 'archived' : 'unarchived'} successfully`,
      note: {
        _id: note._id,
        isArchived: note.isArchived
      }
    });

  } catch (error) {
    console.error('Toggle archive error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle archive"
    });
  }
};

// Get user's note statistics
module.exports.getNoteStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Note.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalNotes: { $sum: 1 },
          starredNotes: { 
            $sum: { $cond: [{ $eq: ["$isStarred", true] }, 1, 0] } 
          },
          archivedNotes: { 
            $sum: { $cond: [{ $eq: ["$isArchived", true] }, 1, 0] } 
          },
          totalWords: { $sum: "$wordCount" },
          recentNotes: {
            $sum: {
              $cond: [
                { 
                  $gte: [
                    "$modifiedAt", 
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ] 
                }, 
                1, 
                0
              ]
            }
          }
        }
      }
    ]);

    const noteStats = stats[0] || {
      totalNotes: 0,
      starredNotes: 0,
      archivedNotes: 0,
      totalWords: 0,
      recentNotes: 0
    };

    res.status(200).json({
      success: true,
      stats: noteStats
    });

  } catch (error) {
    console.error('Get note stats error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch note statistics"
    });
  }
};