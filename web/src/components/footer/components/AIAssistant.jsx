"use client";

import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const AIAssistant = () => {
  const { theme, themeName } = useTheme();
  const [aiPosition, setAiPosition] = useState({ x: 20, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Refs
  const longPressTimer = useRef(null);
  const dragThreshold = useRef(false);
  const clickPrevented = useRef(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragThreshold.current = false;
    clickPrevented.current = false;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Constrain to viewport
      const newX = Math.min(Math.max(e.clientX - 30, 0), window.innerWidth - 60);
      const newY = Math.min(Math.max(e.clientY - 30, 0), window.innerHeight - 60);
      setAiPosition({ x: newX, y: newY });
      dragThreshold.current = true;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Long press handlers - only for hiding
  const handleTouchStart = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    longPressTimer.current = setTimeout(() => {
      setIsVisible(false);
      longPressTimer.current = null;
    }, 800);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsVisible(false);
  };

  const handleClick = (e) => {
    if (!dragThreshold.current && !clickPrevented.current) {
      setShowExploreModal(true);
    }
    dragThreshold.current = false;
    clickPrevented.current = false;
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: `Thank you for your question: "${userMessage.text}". I'm currently under development, but I'll be able to help you with book recommendations, summaries, and more soon! 🚀`,
        sender: "ai",
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* AI Button */}
      <div
        style={{
          position: "fixed",
          left: aiPosition.x,
          top: aiPosition.y,
          zIndex: 50,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchCancel={handleTouchEnd}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        title="AI Assistant (Right-click or long press to hide)"
        role="button"
        tabIndex={0}
        aria-label="AI Assistant"
      >
        <div className={`p-4 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-500 to-sky-600'} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
          <FaRobot size={24} />
        </div>
      </div>

      {/* Modal */}
      {showExploreModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowExploreModal(false)}
        >
          <div
            className={`${theme.background?.section || 'bg-white dark:bg-gray-800'} rounded-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-500 to-sky-600'} rounded-full`}>
                  <FaRobot className="text-white" size={16} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
                    AI Assistant
                  </h2>
                  <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                    Always here to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowExploreModal(false)}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-96">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <FaRobot className={`text-4xl mx-auto mb-3 ${theme.textColors?.highlight || 'text-sky-500'}`} />
                  <p className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
                    Hello! 👋<br />
                    I'm your AI reading assistant.<br />
                    Ask me anything about books, authors, or reading recommendations!
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-500 to-sky-600 text-white'
                          : `${theme.background?.navigationDots || 'bg-gray-100 dark:bg-gray-700'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`p-3 rounded-lg ${theme.background?.navigationDots || 'bg-gray-100 dark:bg-gray-700'}`}>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${theme.border?.default || 'border-gray-300 dark:border-gray-600'} ${theme.background?.section || 'bg-white dark:bg-gray-700'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-4 py-2 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-500 to-sky-600'} text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Send
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className={`text-xs text-center ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                💡 Tip: Long press or right-click the AI button to hide it
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;