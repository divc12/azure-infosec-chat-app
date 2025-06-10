// src/components/ApplicationPage.tsx
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import {
  Stack,
  TextField,
  PrimaryButton,
  IconButton,
  Icon,
  IIconProps,
  IButtonStyles,
} from '@fluentui/react';
import { useChat, Message } from '../contexts/ChatContext';
import styles from './ApplicationPage.module.css';
import { appConfig } from '../config/appConfig';

/*********************************************************************
 * ICON DEFINITIONS
 *********************************************************************/
const uploadIcon: IIconProps = { iconName: 'Upload' };
const downloadIcon: IIconProps = { iconName: 'Download' };
const clearIcon: IIconProps = { iconName: 'Clear' };

const initialSendIcon: IIconProps = {
  iconName: 'Send',
  styles: {
    root: {
      transform: 'rotate(-45deg)',
    },
  },
};
const sendIconText: IIconProps = {
  iconName: 'ArrowUpRight8',
  styles: {
    root: {
      transform: 'rotate(-45deg)',
    },
  },
};
const sendIconProcessing: IIconProps = {
  iconName: 'SquareShapeSolid',
  styles: {
    root: {
      fontSize: '13px',
    },
  },
};

/*********************************************************************
 * getSendButtonStyles()
 *********************************************************************/
const getSendButtonStyles = (): IButtonStyles => ({
  root: {
    animationName: 'scaleIn',
    animationDuration: '0.3s',
  },
  icon: {
    transition: 'transform 0.1s ease-in-out',
  },
});

export const ApplicationPage: FC = () => {
  // 1. Determine appId from URL
  const rawPath = window.location.pathname;
  const appId = rawPath.startsWith('/app')
    ? rawPath.replace('/app', '').replace('/', '')
    : '1';
  const config = appConfig[appId] || appConfig['1'];

  // 2. Consume ChatContext
  const { messages, isProcessing, sendMessage } = useChat(appId);

  // 3. Local input state & "hasTyped"
  const [inputValue, setInputValue] = useState<string>('');
  const [hasTyped, setHasTyped] = useState<boolean>(false);

  // 4. Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 5. Handlers
  const handleSend = () => {
    if ((!inputValue.trim() && !isProcessing) || isProcessing) return;
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue('');
      setHasTyped(false);
    }
  };

  const handleChange = (_: any, newVal?: string) => {
    setInputValue(newVal ?? '');
    setHasTyped(Boolean(newVal && newVal.length > 0));
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      // TODO: implement upload logic
    }
  };

  const handleDownload = () => {
    const chatText = messages.map((m) => `${m.sender}: ${m.text}`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat_history.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setInputValue('');
    setHasTyped(false);
  };

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSendIcon = (): IIconProps => {
    if (isProcessing) return sendIconProcessing;
    if (hasTyped) return sendIconText;
    return initialSendIcon;
  };

  return (
    <div className={styles.appPageContainer}>
      <Stack className={styles.chatFrame}>
        {/* Header */}
        <div className={styles.header}>
          <Icon iconName={config.iconName} className={styles.headerIcon} />
          {config.title}
        </div>

        {/* Chat panel */}
        <div className={styles.messageContainer}>
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={
                msg.sender === 'user'
                  ? styles.messageRowUser
                  : styles.messageRowBot
              }
            >
              <div
                className={
                  msg.sender === 'user'
                    ? styles.bubbleUser
                    : styles.bubbleBot
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input + controls wrapped together */}
        <div className={styles.inputWrapper}>
          <div className={styles.textFieldWrapper}>
            <TextField
              multiline
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleChange}
              onKeyDown={onEnterPress}
              className={styles.textField}
            />
          </div>
          <div className={styles.controlBar}>
            <div className={styles.leftControls}>
              {/* Dark‐gray icons using .darkIcon */}
              <IconButton
                iconProps={uploadIcon}
                className={styles.darkIcon}
                ariaLabel="Upload file"
                onClick={() =>
                  document.getElementById('fileInput')?.click()
                }
              />
              <input
                id="fileInput"
                type="file"
                accept="*"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
              <IconButton
                iconProps={downloadIcon}
                className={styles.darkIcon}
                ariaLabel="Download chat history"
                onClick={handleDownload}
              />
              <IconButton
                iconProps={clearIcon}
                className={styles.darkIcon}
                ariaLabel="Clear text"
                onClick={handleClear}
              />
            </div>
            <div className={styles.rightControls}>
              {/* Red, circular send button */}
              <PrimaryButton
                iconProps={getSendIcon()}
                onClick={handleSend}
                styles={getSendButtonStyles()}
                ariaLabel="Send message"
                className={styles.sendButtonRed}
              />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};
export default ApplicationPage;