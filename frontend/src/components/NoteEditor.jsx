import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  // Eye,        // Removed preview icons
  // EyeOff,     // Removed preview icons
  Star,
  Hash,
  Calendar,
  Clock,
  Palette,
  Loader,
  FileText
} from 'lucide-react';

const NoteEditor = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  // Editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  // const [isPreviewMode, setIsPreviewMode] = useState(false); // Removed preview feature
  const [isStarred, setIsStarred] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showFormatBar, setShowFormatBar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);

  // Colors for note themes
  const noteColors = [
    { name: 'Default', bg: 'bg-white/5', border: 'border-white/10' },
    { name: 'Blue', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { name: 'Green', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    { name: 'Purple', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { name: 'Orange', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    { name: 'Pink', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  ];
  const [selectedColor, setSelectedColor] = useState(noteColors[0]);

  // Load existing note if editing
  useEffect(() => {
    if (noteId) {
      loadNote();
    } else {
      setIsNewNote(true);
      // Focus on title for new notes
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.focus();
        }
      }, 200);
    }
  }, [noteId]);

  // Update word and character count
  useEffect(() => {
    const textContent = editorRef.current?.textContent || '';
    const words = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = textContent.length;
    setWordCount(textContent.trim() === '' ? 0 : words);
    setCharCount(chars);
  }, [content]);

  // Mark as dirty when content changes
  useEffect(() => {
    if (title || content || tags.length > 0) {
      setIsDirty(true);
    }
  }, [title, content, tags]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!isDirty || !noteId) return;
    
    const autoSave = setInterval(() => {
      if (isDirty && (title.trim() || content.trim())) {
        handleAutoSave();
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [isDirty, title, content, noteId]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const response = await apiService.getNote(noteId);
      const note = response.note;
      
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
      setIsStarred(note.isStarred);
      setIsNewNote(false);
      
      // Find matching color
      const matchingColor = noteColors.find(color => 
        color.name.toLowerCase() === note.color?.toLowerCase()
      ) || noteColors[0];
      setSelectedColor(matchingColor);
      
      // Set content in editor
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = note.content;
        }
      }, 100);
      
    } catch (error) {
      console.error('Failed to load note:', error);
      toast.error('Failed to load note');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoSave = async () => {
    if (!noteId || !isDirty) return;
    
    try {
      const noteData = {
        title: title || 'Untitled Note',
        content,
        tags,
        isStarred,
        color: selectedColor.name.toLowerCase()
      };

      await apiService.updateNote(noteId, noteData);
      setLastSaved(new Date());
      setIsDirty(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const shouldLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!shouldLeave) return;
    }
    navigate('/dashboard');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const noteData = {
        title: title || 'Untitled Note',
        content,
        tags,
        isStarred,
        color: selectedColor.name.toLowerCase()
      };

      let response;
      if (isNewNote) {
        response = await apiService.createNote(noteData);
        toast.success('Note created successfully!');
        // Redirect to edit mode for the new note
        navigate(`/note-editor/${response.note._id}`, { replace: true });
      } else {
        response = await apiService.updateNote(noteId, noteData);
        toast.success('Note saved successfully!');
      }
      
      setLastSaved(new Date());
      setIsDirty(false);
      
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      const trimmedTag = currentTag.trim().toLowerCase();
      if (!tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleStar = async () => {
    if (!isNewNote && noteId) {
      try {
        await apiService.toggleStar(noteId);
        setIsStarred(!isStarred);
        toast.success(isStarred ? 'Note unstarred' : 'Note starred');
      } catch (error) {
        console.error('Failed to toggle star:', error);
        toast.error('Failed to update star status');
      }
    } else {
      // For new notes, just update local state
      setIsStarred(!isStarred);
    }
  };

  // Format text functions (keeping the existing ones from previous implementation)
  const formatText = (command, value = null) => {
    editorRef.current?.focus();
    
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    
    try {
      if (command === 'bold') {
        document.execCommand('bold', false);
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const boldElement = range.commonAncestorContainer.parentElement;
            if (boldElement && (boldElement.tagName === 'B' || boldElement.tagName === 'STRONG')) {
              boldElement.style.cssText = `
                font-weight: bold !important;
                color: #ffffff !important;
                display: inline !important;
              `;
            }
          }
        }, 0);
      } else if (command === 'italic') {
        document.execCommand('italic', false);
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const italicElement = range.commonAncestorContainer.parentElement;
            if (italicElement && (italicElement.tagName === 'I' || italicElement.tagName === 'EM')) {
              italicElement.style.cssText = `
                font-style: italic !important;
                color: #ffffff !important;
                display: inline !important;
              `;
            }
          }
        }, 0);
      } else if (command === 'underline') {
        const selectedText = range.toString();
        if (selectedText) {
          const u = document.createElement('u');
          u.style.textDecoration = 'underline';
          u.style.color = '#ffffff';
          
          try {
            range.surroundContents(u);
          } catch (e) {
            u.textContent = selectedText;
            range.deleteContents();
            range.insertNode(u);
          }
          
          selection.removeAllRanges();
          const newRange = document.createRange();
          newRange.setStartAfter(u);
          newRange.collapse(true);
          selection.addRange(newRange);
        }
      } else if (command === 'insertUnorderedList') {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        
        ul.style.cssText = `
          margin: 1rem 0;
          padding-left: 2rem;
          color: #ffffff;
          list-style-type: disc;
        `;
        
        li.style.cssText = `
          margin: 0.5rem 0;
          color: #ffffff;
        `;
        
        li.textContent = selectedText || 'List item';
        ul.appendChild(li);
        
        range.deleteContents();
        range.insertNode(ul);
        
        const newRange = document.createRange();
        newRange.setStartAfter(li.lastChild || li);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        
      } else if (command === 'insertOrderedList') {
        const ol = document.createElement('ol');
        ol.style.margin = '1rem 0';
        ol.style.paddingLeft = '2rem';
        ol.style.color = '#ffffff';
        
        const li = document.createElement('li');
        li.style.margin = '0.5rem 0';
        li.style.color = '#ffffff';
        li.textContent = range.toString() || 'List item';
        
        ol.appendChild(li);
        range.deleteContents();
        range.insertNode(ol);
        
        const newRange = document.createRange();
        newRange.setStart(li, 0);
        newRange.setEnd(li, li.childNodes.length);
        selection.removeAllRanges();
        selection.addRange(newRange);
        
      } else {
        document.execCommand(command, false, value);
      }
      
      setTimeout(() => {
        if (editorRef.current) {
          setContent(editorRef.current.innerHTML);
        }
      }, 50);
      
    } catch (error) {
      console.warn('Format command failed:', command, error);
      try {
        document.execCommand(command, false, value);
        setTimeout(() => {
          if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
          }
        }, 50);
      } catch (fallbackError) {
        console.error('Fallback format command also failed:', fallbackError);
      }
    }
    
    editorRef.current?.focus();
  };

  const insertHeading = (level) => {
    editorRef.current?.focus();
    
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    try {
      const heading = document.createElement(`h${level}`);
      heading.style.cssText = `
        font-size: ${level === 1 ? '1.5rem' : level === 2 ? '1.25rem' : '1.125rem'} !important;
        font-weight: ${level === 1 ? 'bold' : level === 2 ? '600' : '500'} !important;
        margin-bottom: ${level === 1 ? '1rem' : level === 2 ? '0.75rem' : '0.5rem'} !important;
        color: #ffffff !important;
      `;
      
      heading.textContent = selectedText || `Heading ${level}`;
      
      range.deleteContents();
      range.insertNode(heading);
      
      const newRange = document.createRange();
      newRange.setStartAfter(heading);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
      
      setTimeout(() => {
        if (editorRef.current) {
          setContent(editorRef.current.innerHTML);
        }
      }, 10);
      
    } catch (error) {
      console.warn('Heading insertion failed:', error);
      try {
        document.execCommand('formatBlock', false, `h${level}`);
        
        const headingElement = range.commonAncestorContainer.parentElement;
        if (headingElement && headingElement.tagName === `H${level}`) {
          headingElement.style.cssText = `
            font-size: ${level === 1 ? '1.5rem' : level === 2 ? '1.25rem' : '1.125rem'} !important;
            font-weight: ${level === 1 ? 'bold' : level === 2 ? '600' : '500'} !important;
            margin-bottom: ${level === 1 ? '1rem' : level === 2 ? '0.75rem' : '0.5rem'} !important;
            color: #ffffff !important;
          `;
        }
        
        setTimeout(() => {
          if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
          }
        }, 10);
      } catch (fallbackError) {
        console.error('Fallback heading insertion failed:', fallbackError);
      }
    }
    
    editorRef.current?.focus();
  };

  const formatButtons = [
    { icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: Underline, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Quote' },
    { icon: Code, command: 'formatBlock', value: 'pre', tooltip: 'Code Block' },
  ];

  const alignButtons = [
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
  ];

  const headingButtons = [
    { icon: Heading1, action: () => insertHeading(1), tooltip: 'Heading 1' },
    { icon: Heading2, action: () => insertHeading(2), tooltip: 'Heading 2' },
    { icon: Heading3, action: () => insertHeading(3), tooltip: 'Heading 3' },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header 
        className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Back and title */}
            <div className="flex items-center gap-4 flex-1">
              <motion.button
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center gap-3">
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="Untitled Note"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-transparent text-xl font-semibold outline-none placeholder-gray-500 min-w-0 flex-1"
                />
                
                <button
                  onClick={toggleStar}
                  className={`p-1 rounded transition-colors duration-200 ${
                    isStarred ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
                  }`}
                >
                  <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleSave}
                disabled={saving || (!isDirty && !isNewNote)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  isDirty || isNewNote
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={(isDirty || isNewNote) ? { scale: 1.05 } : {}}
                whileTap={(isDirty || isNewNote) ? { scale: 0.95 } : {}}
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isNewNote ? 'Create Note' : 'Save'}
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
              {lastSaved && (
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              )}
              {isDirty && <span className="text-yellow-400">• Unsaved changes</span>}
              {isNewNote && <span className="text-blue-400">• New note</span>}
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            {/* Formatting Toolbar */}
            {showFormatBar && (
              <motion.div 
                className="mb-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Headings */}
                  <div className="flex items-center gap-1 border-r border-white/20 pr-4">
                    {headingButtons.map(({ icon: Icon, action, tooltip }, index) => (
                      <button
                        key={index}
                        onClick={action}
                        title={tooltip}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  {/* Formatting */}
                  <div className="flex items-center gap-1 border-r border-white/20 pr-4">
                    {formatButtons.map(({ icon: Icon, command, value, tooltip }, index) => (
                      <button
                        key={index}
                        onClick={() => formatText(command, value)}
                        title={tooltip}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  {/* Alignment */}
                  <div className="flex items-center gap-1 border-r border-white/20 pr-4">
                    {alignButtons.map(({ icon: Icon, command, tooltip }, index) => (
                      <button
                        key={index}
                        onClick={() => formatText(command)}
                        title={tooltip}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  {/* Undo/Redo */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => formatText('undo')}
                      title="Undo (Ctrl+Z)"
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      <Undo className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => formatText('redo')}
                      title="Redo (Ctrl+Y)"
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      <Redo className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Editor Area */}
            <motion.div 
              className={`relative min-h-[600px] p-8 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${selectedColor.bg} ${selectedColor.border}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  setContent(e.target.innerHTML);
                }}
                onKeyDown={(e) => {
                  // Handle common shortcuts
                  if (e.ctrlKey || e.metaKey) {
                    switch (e.key) {
                      case 'b':
                        e.preventDefault();
                        formatText('bold');
                        return;
                      case 'i':
                        e.preventDefault();
                        formatText('italic');
                        return;
                      case 'u':
                        e.preventDefault();
                        formatText('underline');
                        return;
                      case 's':
                        e.preventDefault();
                        handleSave();
                        return;
                    }
                  }
                  
                  // Handle Enter key in lists
                  if (e.key === 'Enter') {
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                      let currentElement = selection.anchorNode;
                      
                      while (currentElement && currentElement.nodeType !== Node.ELEMENT_NODE) {
                        currentElement = currentElement.parentNode;
                      }
                      
                      while (currentElement && currentElement !== editorRef.current) {
                        if (currentElement.tagName === 'LI') {
                          if (currentElement.textContent.trim() === '') {
                            e.preventDefault();
                            
                            const list = currentElement.parentElement;
                            const newP = document.createElement('div');
                            newP.innerHTML = '<br>';
                            newP.style.color = '#ffffff';
                            
                            if (list.parentNode) {
                              list.parentNode.insertBefore(newP, list.nextSibling);
                              
                              if (list.children.length === 1) {
                                list.parentNode.removeChild(list);
                              } else {
                                currentElement.parentNode.removeChild(currentElement);
                              }
                              
                              const range = document.createRange();
                              range.setStart(newP, 0);
                              range.collapse(true);
                              selection.removeAllRanges();
                              selection.addRange(range);
                              
                              setTimeout(() => {
                                if (editorRef.current) {
                                  setContent(editorRef.current.innerHTML);
                                }
                              }, 10);
                            }
                            return;
                          } else {
                            e.preventDefault();
                            
                            const newLi = document.createElement('li');
                            newLi.style.margin = '0.5rem 0';
                            newLi.style.color = '#ffffff';
                            newLi.innerHTML = '<br>';
                            
                            currentElement.parentNode.insertBefore(newLi, currentElement.nextSibling);
                            
                            const range = document.createRange();
                            range.setStart(newLi, 0);
                            range.collapse(true);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            
                            setTimeout(() => {
                              if (editorRef.current) {
                                setContent(editorRef.current.innerHTML);
                              }
                            }, 10);
                            return;
                          }
                        }
                        currentElement = currentElement.parentNode;
                      }
                    }
                  }
                }}
                className="outline-none min-h-[500px] text-gray-100 leading-relaxed editor-content"
                style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.7'
                }}
                data-placeholder=""
              />

              {/* Empty state */}
              {!content && (
                <div className="absolute inset-8 flex items-center justify-center text-gray-500 pointer-events-none">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-xl mb-2">Start writing your note</p>
                    <p className="text-sm">Use the formatting toolbar above to style your text</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tags */}
            <motion.div 
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-4 h-4 text-blue-400" />
                <h3 className="font-semibold">Tags</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2 group"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg outline-none text-sm placeholder-gray-500 focus:border-blue-500/50"
                />
              </div>
            </motion.div>

            {/* Note Color */}
            <motion.div 
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-purple-400" />
                <h3 className="font-semibold">Note Color</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {noteColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`aspect-square rounded-lg border-2 transition-all duration-200 ${
                      color.bg
                    } ${
                      selectedColor.name === color.name 
                        ? 'border-white/50 scale-110' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    title={color.name}
                  >
                    <div className="w-full h-full rounded-md" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setShowFormatBar(!showFormatBar)}
                  className="w-full p-2 text-left hover:bg-white/5 rounded-lg transition-colors text-sm"
                >
                  {showFormatBar ? 'Hide' : 'Show'} Format Bar
                </button>
                
                <button
                  onClick={() => {
                    const plainText = editorRef.current?.textContent || '';
                    navigator.clipboard.writeText(plainText);
                    toast.success('Content copied to clipboard');
                  }}
                  className="w-full p-2 text-left hover:bg-white/5 rounded-lg transition-colors text-sm"
                >
                  Copy Content
                </button>
                
                <button
                  onClick={() => {
                    const plainText = editorRef.current?.textContent || '';
                    const element = document.createElement('a');
                    const file = new Blob([`# ${title || 'Untitled Note'}\n\n${plainText}`], { type: 'text/plain' });
                    element.href = URL.createObjectURL(file);
                    element.download = `${title || 'note'}.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    toast.success('Note exported successfully');
                  }}
                  className="w-full p-2 text-left hover:bg-white/5 rounded-lg transition-colors text-sm"
                >
                  Export as Text
                </button>

                {!isNewNote && (
                  <button
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
                        try {
                          await apiService.deleteNote(noteId);
                          toast.success('Note deleted successfully');
                          navigate('/dashboard');
                        } catch (error) {
                          console.error('Failed to delete note:', error);
                          toast.error('Failed to delete note');
                        }
                      }
                    }}
                    className="w-full p-2 text-left hover:bg-red-500/10 rounded-lg transition-colors text-sm text-red-400"
                  >
                    Delete Note
                  </button>
                )}
              </div>
            </motion.div>

            {/* Note Info */}
            {!isNewNote && (
              <motion.div 
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="font-semibold mb-4">Note Info</h3>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Modified: {lastSaved ? lastSaved.toLocaleDateString() : 'Not saved'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Words: {wordCount}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Add editor styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .editor-content:empty:before {
            content: attr(data-placeholder);
            color: #6b7280;
            pointer-events: none;
            position: absolute;
          }
          .editor-content:focus:empty:before {
            content: attr(data-placeholder);
            color: #6b7280;
            pointer-events: none;
            position: absolute;
          }
          .editor-content h1 { 
            font-size: 1.5rem !important; 
            font-weight: bold !important; 
            margin-bottom: 1rem !important; 
            color: #ffffff !important;
          }
          .editor-content h2 { 
            font-size: 1.25rem !important; 
            font-weight: 600 !important; 
            margin-bottom: 0.75rem !important; 
            color: #ffffff !important;
          }
          .editor-content h3 { 
            font-size: 1.125rem !important; 
            font-weight: 500 !important; 
            margin-bottom: 0.5rem !important; 
            color: #ffffff !important;
          }
          .editor-content blockquote { 
            border-left: 4px solid #3b82f6 !important; 
            padding-left: 1rem !important; 
            margin: 1rem 0 !important; 
            font-style: italic !important;
            color: #9ca3af !important;
          }
          .editor-content pre { 
            background: rgba(0, 0, 0, 0.3) !important; 
            padding: 1rem !important; 
            border-radius: 0.5rem !important; 
            font-family: monospace !important;
            margin: 1rem 0 !important;
            overflow-x: auto !important;
            color: #ffffff !important;
          }
          .editor-content ul { 
            list-style-type: disc !important;
            margin: 1rem 0 !important; 
            padding-left: 2rem !important;
          }
          .editor-content ol {
            list-style-type: decimal !important;
            margin: 1rem 0 !important;
            padding-left: 2rem !important;
          }
          .editor-content li {
            display: list-item !important;
            margin: 0.5rem 0 !important;
            color: #ffffff !important;
          }
          .editor-content em, .editor-content i { 
            font-style: italic !important;
            display: inline !important;
            color: #ffffff !important;
          }
        `
      }} />
    </div>
  );
};

export default NoteEditor;