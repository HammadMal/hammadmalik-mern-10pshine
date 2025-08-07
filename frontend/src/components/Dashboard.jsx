import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import apiService from '../services/apiService';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar,
  Clock,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Edit3,
  Grid,
  List,
  SortAsc,
  SortDesc,
  LogOut,
  User,
  Loader
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State management
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('modifiedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteStats, setNoteStats] = useState({
    totalNotes: 0,
    starredNotes: 0,
    archivedNotes: 0,
    recentNotes: 0
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalNotes: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Check authentication and load data on mount
  useEffect(() => {
    checkUserAuth();
  }, []);

  // Load notes when filters change
  useEffect(() => {
    if (currentUser) {
      loadNotes();
    }
  }, [currentUser, searchTerm, filterBy, sortBy, sortOrder]);

  // Load note stats
  useEffect(() => {
    if (currentUser) {
      loadNoteStats();
    }
  }, [currentUser]);

  const checkUserAuth = async () => {
    try {
      const response = await apiService.checkAuth();
      
      if (response.status) {
        setCurrentUser({ username: response.user });
      } else {
        toast.error('Please log in to access the dashboard');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      toast.error('Authentication failed');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      const queryParams = {
        search: searchTerm || undefined,
        filter: filterBy,
        sortBy,
        sortOrder,
        page: 1,
        limit: 20
      };

      const response = await apiService.getNotes(queryParams);
      setNotes(response.notes);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to load notes:', error);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const loadNoteStats = async () => {
    try {
      const response = await apiService.getNoteStats();
      setNoteStats(response.stats);
    } catch (error) {
      console.error('Failed to load note stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setCurrentUser(null);
      toast.success('Logged out successfully!');
      setTimeout(() => {
        navigate('/signin');
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const navigateToEditor = (noteId = null) => {
    if (noteId) {
      navigate(`/note-editor/${noteId}`);
    } else {
      navigate('/note-editor');
    }
  };

  const handleCreateNote = () => {
    navigateToEditor();
  };

  const handleNoteClick = (noteId) => {
    navigateToEditor(noteId);
  };

  const toggleStar = async (noteId, e) => {
    e.stopPropagation();
    try {
      await apiService.toggleStar(noteId);
      
      // Update local state
      setNotes(notes.map(note => 
        note._id === noteId ? { ...note, isStarred: !note.isStarred } : note
      ));
      
      // Reload stats
      loadNoteStats();
      
      toast.success('Note updated successfully');
    } catch (error) {
      console.error('Failed to toggle star:', error);
      toast.error('Failed to update note');
    }
  };

  const handleArchive = async (noteId, e) => {
    e.stopPropagation();
    try {
      await apiService.toggleArchive(noteId);
      
      // Remove from current view if we're not showing archived notes
      if (filterBy !== 'archived') {
        setNotes(notes.filter(note => note._id !== noteId));
      }
      
      loadNoteStats();
      toast.success('Note archived successfully');
    } catch (error) {
      console.error('Failed to archive note:', error);
      toast.error('Failed to archive note');
    }
  };

  const handleDelete = async (noteId, e) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.deleteNote(noteId);
      setNotes(notes.filter(note => note._id !== noteId));
      loadNoteStats();
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Loading state
  if (loading && !currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.header 
        className="border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">My Notes</h1>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                {pagination.totalNotes} notes
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* User Info */}
              {currentUser && (
                <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
                  <User className="w-4 h-4 text-gray-300" />
                  <span className="text-sm text-gray-300">
                    {currentUser.username}
                  </span>
                </div>
              )}

              {/* New Note Button */}
              <motion.button
                onClick={handleCreateNote}
                className="
                  px-6 py-3 transform rounded-lg bg-black text-white font-medium 
                  transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 
                  shadow-lg hover:shadow-xl flex items-center gap-2
                  dark:bg-white dark:text-black dark:hover:bg-gray-200
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                New Note
              </motion.button>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="
                  px-6 py-3 transform rounded-lg bg-red-600 text-white font-medium 
                  transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 
                  shadow-lg hover:shadow-xl flex items-center gap-2
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Controls */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                text-white placeholder-gray-400 outline-none
                focus:border-white/30 focus:bg-white/10
                transition-all duration-300
              "
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
             {/* Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="
                px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                text-white text-sm outline-none
                focus:border-white/30 focus:bg-white/10
                transition-all duration-300
              "
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white'
              }}
            >
              <option value="all" style={{ backgroundColor: '#1f2937', color: 'white' }}>All Notes</option>
              <option value="starred" style={{ backgroundColor: '#1f2937', color: 'white' }}>Starred</option>
              <option value="recent" style={{ backgroundColor: '#1f2937', color: 'white' }}>Recent</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                text-white text-sm outline-none
                focus:border-white/30 focus:bg-white/10
                transition-all duration-300
              "
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white'
              }}
            >
              <option value="modifiedAt" style={{ backgroundColor: '#1f2937', color: 'white' }}>Last Modified</option>
              <option value="createdAt" style={{ backgroundColor: '#1f2937', color: 'white' }}>Date Created</option>
              <option value="title" style={{ backgroundColor: '#1f2937', color: 'white' }}>Title</option>
            </select>
            <button
              onClick={toggleSort}
              className="
                p-2 bg-white/5 border border-white/10 rounded-lg
                text-gray-400 hover:text-white hover:bg-white/10
                transition-all duration-300
              "
            >
              {sortOrder === 'desc' ? <SortDesc className="w-5 h-5" /> : <SortAsc className="w-5 h-5" />}
            </button>

            {/* View Mode */}
            <div className="flex border border-white/10 rounded-lg overflow-hidden bg-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading notes...</p>
          </div>
        )}

        {/* Notes Grid/List */}
        {!loading && notes.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {searchTerm ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Create your first note to get started'
              }
            </p>
            {!searchTerm && (
              <motion.button
                onClick={handleCreateNote}
                className="
                  px-8 py-3 transform rounded-lg bg-black text-white font-medium 
                  transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 
                  shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto
                  dark:bg-white dark:text-black dark:hover:bg-gray-200
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Create Your First Note
              </motion.button>
            )}
          </motion.div>
        ) : !loading && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {notes.map((note, index) => (
              <motion.div
                key={note._id}
                className={`
                  relative cursor-pointer group
                  ${viewMode === 'grid' 
                    ? 'p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20' 
                    : 'p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 flex items-center gap-4'
                  }
                  transition-all duration-300 transform hover:scale-[1.02]
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleNoteClick(note._id)}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                }}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate mb-1">
                          {note.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(note.modifiedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleStar(note._id, e)}
                          className={`p-1 rounded-lg transition-all duration-300 ${
                            note.isStarred 
                              ? 'text-yellow-400 hover:text-yellow-300' 
                              : 'text-gray-500 hover:text-yellow-400'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${note.isStarred ? 'fill-current' : ''}`} />
                        </button>
                        
                        <div className="relative">
                          {/* <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(showDropdown === note._id ? null : note._id);
                            }}
                            className="p-1 text-gray-500 hover:text-white rounded-lg transition-colors duration-300"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button> */}
                          
                          {showDropdown === note._id && (
                            <div 
                              className="absolute right-0 top-8 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-50"
                              onClick={(e) => e.stopPropagation()} // Add this line to prevent click propagation
                            >
                              <div className="py-2">
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDropdown(null);
                                    handleNoteClick(note._id);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors duration-200"
                                >
                                  <Edit3 className="w-4 h-4" />
                                  Edit
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDropdown(null);
                                    handleArchive(note._id, e);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors duration-200"
                                >
                                  <Archive className="w-4 h-4" />
                                  Archive
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDropdown(null);
                                    handleDelete(note._id, e);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors duration-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {note.content.replace(/<[^>]*>/g, '')} {/* Strip HTML for preview */}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{note.wordCount} words</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {note.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {note.title}
                        </h3>
                        {note.isStarred && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                        {note.content.replace(/<[^>]*>/g, '')}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatDate(note.modifiedAt)}</span>
                        <span>{note.wordCount} words</span>
                        <div className="flex gap-1">
                          {note.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/10 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleStar(note._id, e)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          note.isStarred 
                            ? 'text-yellow-400 hover:text-yellow-300' 
                            : 'text-gray-500 hover:text-yellow-400'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${note.isStarred ? 'fill-current' : ''}`} />
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDropdown(showDropdown === note._id ? null : note._id);
                          }}
                          className="p-2 text-gray-500 hover:text-white rounded-lg transition-colors duration-300"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {showDropdown === note._id && (
                          <div 
                            className="absolute right-0 top-8 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-50"
                            onClick={(e) => e.stopPropagation()} // Add this line to prevent click propagation
                          >
                            <div className="py-2">
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowDropdown(null);
                                  handleNoteClick(note._id);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors duration-200"
                              >
                                <Edit3 className="w-4 h-4" />
                                Edit
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowDropdown(null);
                                  handleArchive(note._id, e);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2 transition-colors duration-200"
                              >
                                <Archive className="w-4 h-4" />
                                Archive
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowDropdown(null);
                                  handleDelete(note._id, e);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Click outside to close dropdowns */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowDropdown(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;