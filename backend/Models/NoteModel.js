const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Note title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  content: {
    type: String,
    required: [true, "Note content is required"],
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isStarred: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
    default: 'default',
    enum: ['default', 'blue', 'green', 'purple', 'orange', 'pink']
  },
  wordCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

noteSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.modifiedAt = new Date();
  }
  
  if (this.isModified('content')) {
    const textContent = this.content.replace(/<[^>]*>/g, '');
    const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
    this.wordCount = textContent.trim() === '' ? 0 : words.length;
  }
  
  next();
});

noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, modifiedAt: -1 });
noteSchema.index({ userId: 1, isStarred: 1 });
noteSchema.index({ userId: 1, isArchived: 1 });
noteSchema.index({ 
  title: 'text', 
  content: 'text', 
  tags: 'text' 
}, { 
  weights: { 
    title: 10, 
    content: 5, 
    tags: 3 
  } 
});

module.exports = mongoose.model("Note", noteSchema);