import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Eye,
  EyeOff,
  Star,
  Hash,
  Calendar,
  Clock,
  Palette
} from 'lucide-react';

const NoteEditor = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  // Debug function to test execCommand support
  useEffect(() => {
    if (editorRef.current) {
      console.log('Browser execCommand support:');
      console.log('- bold:', document.queryCommandSupported('bold'));
      console.log('- italic:', document.queryCommandSupported('italic'));
      console.log('- insertUnorderedList:', document.queryCommandSupported('insertUnorderedList'));
      console.log('- insertOrderedList:', document.queryCommandSupported('insertOrderedList'));
    }
  }, []);

  // Add styles for the editor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
      .editor-content ul, .editor-content ol { 
        margin: 1rem 0 !important; 
        padding-left: 2rem !important; 
        color: #ffffff !important;
      }
      .editor-content li { 
        margin: 0.5rem 0 !important; 
        color: #ffffff !important;
      }
      .editor-content strong, .editor-content b {
        font-weight: bold !important;
        color: #ffffff !important;
      }
      .editor-content em, .editor-content i {
        font-style: italic !important;
        color: #ffffff !important;
      }
      .editor-content u {
        text-decoration: underline !important;
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  
  // Editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showFormatBar, setShowFormatBar] = useState(true);

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
      // In a real app, you'd fetch the note from your backend
      // For now, we'll simulate loading an existing note
      const mockNote = {
        id: noteId,
        title: "Sample Note",
        content: "This is a sample note content. You can edit this text and see the rich formatting options available.",
        tags: ["sample", "demo"],
        isStarred: false,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString()
      };
      
      setTitle(mockNote.title);
      setContent(mockNote.content);
      setTags(mockNote.tags);
      setIsStarred(mockNote.isStarred);
      
      // Set content in editor after state update
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = mockNote.content;
        }
      }, 100);
    }
    
    // Focus on title if new note, content if existing
    setTimeout(() => {
      if (!noteId && titleRef.current) {
        titleRef.current.focus();
      } else if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 200);
  }, [noteId]);

  // Update word and character count based on text content, not HTML
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

  const handleBack = () => {
    if (isDirty) {
      const shouldLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!shouldLeave) return;
    }
    navigate('/dashboard');
  };

  const handleSave = () => {
    // In a real app, you'd save to your backend here
    console.log('Saving note:', { title, content, tags, isStarred, color: selectedColor });
    
    setLastSaved(new Date());
    setIsDirty(false);
    
    // Simulate API delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const formatText = (command, value = null) => {
    // Ensure editor is focused
    editorRef.current?.focus();
    
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    
    try {
      if (command === 'bold') {
        const selectedText = range.toString();
        if (selectedText) {
          const strong = document.createElement('strong');
          strong.style.fontWeight = 'bold';
          strong.style.color = '#ffffff';
          
          try {
            range.surroundContents(strong);
          } catch (e) {
            strong.textContent = selectedText;
            range.deleteContents();
            range.insertNode(strong);
          }
          
          // Clear selection
          selection.removeAllRanges();
          // Move cursor after the bold text
          const newRange = document.createRange();
          newRange.setStartAfter(strong);
          newRange.collapse(true);
          selection.addRange(newRange);
        }
      } else if (command === 'italic') {
        const selectedText = range.toString();
        if (selectedText) {
          const em = document.createElement('em');
          em.style.fontStyle = 'italic';
          em.style.color = '#ffffff';
          
          try {
            range.surroundContents(em);
          } catch (e) {
            em.textContent = selectedText;
            range.deleteContents();
            range.insertNode(em);
          }
          
          // Clear selection
          selection.removeAllRanges();
          // Move cursor after the italic text
          const newRange = document.createRange();
          newRange.setStartAfter(em);
          newRange.collapse(true);
          selection.addRange(newRange);
        }
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
          
          // Clear selection
          selection.removeAllRanges();
          // Move cursor after the underlined text
          const newRange = document.createRange();
          newRange.setStartAfter(u);
          newRange.collapse(true);
          selection.addRange(newRange);
        }
      } else if (command === 'insertUnorderedList') {
        // Create unordered list
        const ul = document.createElement('ul');
        ul.style.margin = '1rem 0';
        ul.style.paddingLeft = '2rem';
        ul.style.color = '#ffffff';
        
        const li = document.createElement('li');
        li.style.margin = '0.5rem 0';
        li.style.color = '#ffffff';
        li.textContent = range.toString() || 'List item';
        
        ul.appendChild(li);
        range.deleteContents();
        range.insertNode(ul);
        
        // Place cursor inside the list item
        const newRange = document.createRange();
        newRange.setStart(li, 0);
        newRange.setEnd(li, li.childNodes.length);
        selection.removeAllRanges();
        selection.addRange(newRange);
        
      } else if (command === 'insertOrderedList') {
        // Create ordered list
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
        
        // Place cursor inside the list item
        const newRange = document.createRange();
        newRange.setStart(li, 0);
        newRange.setEnd(li, li.childNodes.length);
        selection.removeAllRanges();
        selection.addRange(newRange);
        
      } else {
        // Fallback to execCommand for other formatting
        document.execCommand(command, false, value);
      }
      
      // Update content state
      setTimeout(() => {
        if (editorRef.current) {
          setContent(editorRef.current.innerHTML);
        }
      }, 50);
      
    } catch (error) {
      console.warn('Format command failed:', command, error);
      // Fallback to execCommand
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
    
    // Restore focus
    editorRef.current?.focus();
  };

  const insertHeading = (level) => {
    editorRef.current?.focus();
    
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    
    try {
      // Get current line/block
      let currentBlock = range.commonAncestorContainer;
      if (currentBlock.nodeType === Node.TEXT_NODE) {
        currentBlock = currentBlock.parentElement;
      }
      
      // Find the actual block element
      while (currentBlock && currentBlock !== editorRef.current && 
             !['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(currentBlock.tagName)) {
        currentBlock = currentBlock.parentElement;
      }
      
      if (currentBlock && currentBlock !== editorRef.current) {
        // Create new heading element
        const heading = document.createElement(`h${level}`);
        heading.style.fontSize = level === 1 ? '1.5rem' : level === 2 ? '1.25rem' : '1.125rem';
        heading.style.fontWeight = level === 1 ? 'bold' : level === 2 ? '600' : '500';
        heading.style.marginBottom = level === 1 ? '1rem' : level === 2 ? '0.75rem' : '0.5rem';
        heading.style.color = '#ffffff';
        heading.textContent = currentBlock.textContent || `Heading ${level}`;
        
        // Replace the current block with the heading
        currentBlock.parentNode.replaceChild(heading, currentBlock);
        
        // Position cursor at end of heading
        const newRange = document.createRange();
        newRange.selectNodeContents(heading);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      
      // Update content
      setTimeout(() => {
        if (editorRef.current) {
          setContent(editorRef.current.innerHTML);
        }
      }, 50);
      
    } catch (error) {
      console.warn('Heading creation failed:', error);
      // Fallback to execCommand
      try {
        document.execCommand('formatBlock', false, `h${level}`);
        setTimeout(() => {
          if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
          }
        }, 50);
      } catch (fallbackError) {
        console.error('Fallback heading command failed:', fallbackError);
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

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!isDirty) return;
    
    const autoSave = setInterval(() => {
      if (isDirty && (title.trim() || content.trim())) {
        console.log('Auto-saving...');
        setLastSaved(new Date());
        setIsDirty(false);
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [isDirty, title, content]);

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
                  onClick={() => setIsStarred(!isStarred)}
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
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </button>

              <motion.button
                onClick={handleSave}
                disabled={!isDirty}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  isDirty 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isDirty ? { scale: 1.05 } : {}}
                whileTap={isDirty ? { scale: 0.95 } : {}}
              >
                <Save className="w-4 h-4" />
                Save
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
            {!isPreviewMode && showFormatBar && (
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
              {isPreviewMode ? (
                <div 
                  className="prose prose-invert max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    // Update content immediately
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
                    
                    // Handle Enter key in lists to create new list items
                    if (e.key === 'Enter') {
                      const selection = window.getSelection();
                      if (selection.rangeCount > 0) {
                        let currentElement = selection.anchorNode;
                        
                        // Find if we're in a list item
                        while (currentElement && currentElement.nodeType !== Node.ELEMENT_NODE) {
                          currentElement = currentElement.parentNode;
                        }
                        
                        while (currentElement && currentElement !== editorRef.current) {
                          if (currentElement.tagName === 'LI') {
                            // We're in a list item
                            if (currentElement.textContent.trim() === '') {
                              // Empty list item, exit the list
                              e.preventDefault();
                              
                              // Create a new paragraph after the list
                              const list = currentElement.parentElement;
                              const newP = document.createElement('div');
                              newP.innerHTML = '<br>';
                              newP.style.color = '#ffffff';
                              
                              // Insert after the list
                              if (list.parentNode) {
                                list.parentNode.insertBefore(newP, list.nextSibling);
                                
                                // Remove the empty list item
                                if (list.children.length === 1) {
                                  // Only one item, remove entire list
                                  list.parentNode.removeChild(list);
                                } else {
                                  // Remove just this item
                                  currentElement.parentNode.removeChild(currentElement);
                                }
                                
                                // Focus the new paragraph
                                const range = document.createRange();
                                range.setStart(newP, 0);
                                range.collapse(true);
                                selection.removeAllRanges();
                                selection.addRange(range);
                                
                                // Update content
                                setTimeout(() => {
                                  if (editorRef.current) {
                                    setContent(editorRef.current.innerHTML);
                                  }
                                }, 10);
                              }
                              return;
                            } else {
                              // Non-empty list item, create new list item
                              e.preventDefault();
                              
                              const newLi = document.createElement('li');
                              newLi.style.margin = '0.5rem 0';
                              newLi.style.color = '#ffffff';
                              newLi.innerHTML = '<br>';
                              
                              // Insert after current item
                              currentElement.parentNode.insertBefore(newLi, currentElement.nextSibling);
                              
                              // Focus the new list item
                              const range = document.createRange();
                              range.setStart(newLi, 0);
                              range.collapse(true);
                              selection.removeAllRanges();
                              selection.addRange(range);
                              
                              // Update content
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
              )}

              {/* Empty state */}
              {!content && !isPreviewMode && (
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
                    // Get plain text content
                    const plainText = editorRef.current?.textContent || '';
                    navigator.clipboard.writeText(plainText);
                  }}
                  className="w-full p-2 text-left hover:bg-white/5 rounded-lg transition-colors text-sm"
                >
                  Copy Content
                </button>
                
                <button
                  onClick={() => {
                    // Get plain text content
                    const plainText = editorRef.current?.textContent || '';
                    const element = document.createElement('a');
                    const file = new Blob([`# ${title}\n\n${plainText}`], { type: 'text/plain' });
                    element.href = URL.createObjectURL(file);
                    element.download = `${title || 'note'}.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="w-full p-2 text-left hover:bg-white/5 rounded-lg transition-colors text-sm"
                >
                  Export as Text
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;