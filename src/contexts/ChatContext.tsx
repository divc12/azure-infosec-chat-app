// src/contexts/ChatContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { appConfig } from '../config/appConfig';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface RawChatContextValue {
  /// All conversations keyed by appId ("1", "2", "3", "4")
  conversations: Record<string, Message[]>;
  /// Whether a given appId is currently waiting for its bot reply
  processing: Record<string, boolean>;
  /// Send a new message for a specific appId
  sendMessage: (appId: string, text: string) => Promise<void>;
}

const ChatContext = createContext<RawChatContextValue | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // conversations["1"] = Message[] for /app1, conversations["2"] = Message[] for /app2, etc.
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  // processing["1"] = true if /app1 is waiting for a reply, etc.
  const [processing, setProcessing] = useState<Record<string, boolean>>({});

  const sendMessage = async (appId: string, text: string) => {
    // If that appId is already processing, do nothing
    if (processing[appId]) return;

    // 1. Append the user message onto that app's conversation
    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
    };
    setConversations(prev => {
      const prevMsgs = prev[appId] ?? [];
      return {
        ...prev,
        [appId]: [...prevMsgs, userMsg],
      };
    });

    // 2. Mark that appId as processing
    setProcessing(prev => ({
      ...prev,
      [appId]: true,
    }));

    // 3. Fire off the POST to /api/chat
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            appId,
            appName: appConfig[appId].title,   // send the human-readable name too
            message: text.trim(),
          }),
      });
      if (!response.ok) {
        throw new Error(`Server responded ${response.status}`);
      }
      const data = await response.json();
      // assume backend returns { reply: string }
      const botMsg: Message = {
        id: Date.now() + 1,
        text: data.reply || 'Error: Empty response',
        sender: 'bot',
      };
      // Append botMsg onto that same conversation
      setConversations(prev => {
        const prevMsgs = prev[appId] ?? [];
        return {
          ...prev,
          [appId]: [...prevMsgs, botMsg],
        };
      });
    } catch (err) {
      const errorMsg: Message = {
        id: Date.now() + 2,
        text: '⚠️ Sorry, something went wrong.',
        sender: 'bot',
      };
      setConversations(prev => {
        const prevMsgs = prev[appId] ?? [];
        return {
          ...prev,
          [appId]: [...prevMsgs, errorMsg],
        };
      });
      console.error('Chat fetch error for appId', appId, err);
    } finally {
      // 4. Clear processing for that appId
      setProcessing(prev => ({
        ...prev,
        [appId]: false,
      }));
    }
  };

  return (
    <ChatContext.Provider value={{ conversations, processing, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

/**
 * useChat(appId) → { messages, isProcessing, sendMessage }
 *   • messages: Message[] for this appId (or [] if none yet)
 *   • isProcessing: boolean for this appId
 *   • sendMessage(text) internally calls context.sendMessage(appId, text)
 */
export const useChat = (appId: string) => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  const { conversations, processing, sendMessage: rawSend } = ctx;

  return {
    messages: conversations[appId] ?? [],
    isProcessing: processing[appId] ?? false,
    sendMessage: (text: string) => rawSend(appId, text),
  };
};
