import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; // Make sure you have this imported
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
  LogOut, // Icon for logout
  User    // Icon for user display
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock navigation functions - replace with actual routing
  const navigateToEditor = (noteId = null) => {
    if (noteId) {
      navigate(`/note-editor/${noteId}`); // Navigate to note editor with existing note
    }
    else {
      navigate('/note-editor'); // Navigate to note editor for new note
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('modified'); // 'modified', 'created', 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'starred', 'recent'
  const [showDropdown, setShowDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // State to store current user info

  // Check user authentication status on component mount
  useEffect(() => {
    checkUserAuth();
  }, []);

  // Function to check if user is authenticated
  const checkUserAuth = async () => {
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        credentials: 'include' // Important: includes cookies in the request
      });
      
      const data = await response.json();
      
      if (data.status) {
        // User is authenticated
        setCurrentUser({ username: data.user });
      } else {
        // User is not authenticated, redirect to login
        toast.error('Please log in to access the dashboard');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      toast.error('Authentication failed');
      navigate('/signin');
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      // Method 1: Simple client-side logout (clearing cookie)
      // This works because we're just clearing the token cookie
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Optional Method 2: You could also create a backend logout endpoint
      // await fetch('http://localhost:4000/logout', {
      //   method: 'POST',
      //   credentials: 'include'
      // });
      
      // Clear user state
      setCurrentUser(null);
      
      // Show success message
      toast.success('Logged out successfully!');
      
      // Redirect to signin page after a short delay
      setTimeout(() => {
        navigate('/signin');
      }, 1000);
      
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  // Mock data - replace with actual API call
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Project Planning Notes",
      content: "Initial brainstorming for the new product launch. Key features to include: user authentication, dashboard design, note organization...",
      createdAt: "2024-01-15T10:30:00Z",
      modifiedAt: "2024-01-20T14:22:00Z",
      isStarred: true,
      tags: ["project", "planning"],
      wordCount: 234
    },
    {
      id: 2,
      title: "Meeting Notes - Team Sync",
      content: "Weekly team synchronization meeting. Discussed progress on current sprint, blockers, and next steps...",
      createdAt: "2024-01-18T09:00:00Z",
      modifiedAt: "2024-01-18T09:45:00Z",
      isStarred: false,
      tags: ["meeting", "team"],
      wordCount: 156
    },
    {
      id: 3,
      title: "Research: Note-taking Apps",
      content: "Comparative analysis of popular note-taking applications. Features, pricing, user experience, and market positioning...",
      createdAt: "2024-01-12T16:20:00Z",
      modifiedAt: "2024-01-19T11:30:00Z",
      isStarred: true,
      tags: ["research", "analysis"],
      wordCount: 423
    },
    {
      id: 4,
      title: "Ideas for Blog Post",
      content: "Collection of ideas for upcoming blog posts about productivity, technology trends, and user experience design...",
      createdAt: "2024-01-10T13:15:00Z",
      modifiedAt: "2024-01-17T16:40:00Z",
      isStarred: false,
      tags: ["writing", "ideas"],
      wordCount: 89
    },
    {
      id: 5,
      title: "Learning Notes: React Hooks",
      content: "Understanding useState, useEffect, useContext, and custom hooks. Examples and best practices for modern React development...",
      createdAt: "2024-01-08T20:00:00Z",
      modifiedAt: "2024-01-16T22:15:00Z",
      isStarred: true,
      tags: ["learning", "react"],
      wordCount: 312
    },
    {
      id: 6,
      title: "Travel Itinerary",
      content: "Planning for upcoming business trip. Flight details, hotel reservations, meeting schedules, and local recommendations...",
      createdAt: "2024-01-05T11:45:00Z",
      modifiedAt: "2024-01-14T13:20:00Z",
      isStarred: false,
      tags: ["travel", "planning"],
      wordCount: 178
    }
  ]);

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

  const filteredAndSortedNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      switch (filterBy) {
        case 'starred': return matchesSearch && note.isStarred;
        case 'recent': 
          const recent = new Date();
          recent.setDate(recent.getDate() - 7);
          return matchesSearch && new Date(note.modifiedAt) > recent;
        default: return matchesSearch;
      }
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'modified':
        default:
          comparison = new Date(a.modifiedAt) - new Date(b.modifiedAt);
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const handleCreateNote = () => {
    // Navigate to note editor with new note
    navigateToEditor();
  };

  const handleNoteClick = (noteId) => {
    // Navigate to note editor with existing note
    navigateToEditor(noteId);
  };

  const toggleStar = (noteId, e) => {
    e.stopPropagation();
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isStarred: !note.isStarred } : note
    ));
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

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
                {filteredAndSortedNotes.length} notes
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
            >
              <option value="all">All Notes</option>
              <option value="starred">Starred</option>
              <option value="recent">Recent</option>
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
            >
              <option value="modified">Last Modified</option>
              <option value="created">Date Created</option>
              <option value="title">Title</option>
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

        {/* Notes Grid/List */}
        {filteredAndSortedNotes.length === 0 ? (
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
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedNotes.map((note, index) => (
              <motion.div
                key={note.id}
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
                onClick={() => handleNoteClick(note.id)}
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
                          onClick={(e) => toggleStar(note.id, e)}
                          className={`p-1 rounded-lg transition-all duration-300 ${
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
                              setShowDropdown(showDropdown === note.id ? null : note.id);
                            }}
                            className="p-1 text-gray-500 hover:text-white rounded-lg transition-colors duration-300"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          
                          {showDropdown === note.id && (
                            <div className="absolute right-0 top-8 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-10">
                              <div className="py-2">
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2">
                                  <Edit3 className="w-4 h-4" />
                                  Edit
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2">
                                  <Archive className="w-4 h-4" />
                                  Archive
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
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
                      {note.content}
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
                        {note.content}
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
                        onClick={(e) => toggleStar(note.id, e)}
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
                            setShowDropdown(showDropdown === note.id ? null : note.id);
                          }}
                          className="p-2 text-gray-500 hover:text-white rounded-lg transition-colors duration-300"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {showDropdown === note.id && (
                          <div className="absolute right-0 top-8 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-10">
                            <div className="py-2">
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2">
                                <Edit3 className="w-4 h-4" />
                                Edit
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2">
                                <Archive className="w-4 h-4" />
                                Archive
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
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