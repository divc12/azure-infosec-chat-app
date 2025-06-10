# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Azure InfoSec Chat App

A React-based information security assistant application with a responsive dashboard, collapsible sidebar, and chat interface powered by a mock backend (to be replaced by an AI agent team).

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Getting Started](#getting-started)  
---

## About

This application provides an enterprise-style InfoSec dashboard with a collapsible navigation sidebar, integrated chat assistant interface, and routing to multiple security-related applications. The chat currently connects to a mock server for development purposes but is designed to work with an AI-powered agent backend.

---

## Features

### 1. Dashboard

- Collapsed sidebar for minimal distraction  
- Topbar with branding and navigation controls  
- Dashboard grid displaying 4 tiles, each linking to a different application  

### 2. Sidebar Expanded (Dashboard → Expanded State)

- Sidebar expands with icons and labels for 4 applications plus Dashboard (Home)  
- Includes stylized S-logo (SVG) and hamburger toggle icon  
- Layout sync ensures main content area is unaffected by sidebar toggling  

### 3. Sidebar Behavior

- Click outside the sidebar smoothly collapses it  
- Transition animations for smooth expand/collapse  
- Subsequent clicks outside do not trigger unwanted re-expansion  

### 4. Chat Page (Example: Application 3 - Infosec)

- Title bar shows application name and stylized logo  
- Chat panel mimics ChatGPT style with input box, buttons, and icons  
- Chat header displays app name with icon  
- Message panel shows conversation history  
- Input wrapper and UI control panel with buttons for Send, Upload, Download, Clear  

### 5. Chat Page - Typing State

- Send button changes icon to an upward arrow when typing  

### 6. Chat Page - Processing State

- Send button shows a solid square icon during processing  

### 7. Chat Page - Sent State

- Send button returns to original icon after sending  
- Frontend connects to a **mock server endpoint** (`POST /api/chat`) for instant responses  
- Future integration with AI agent team to process uploaded documents via LLM pipeline  

### 8. Upload Button

- Opens file picker dialog for document upload  

### 9. Download Button

- Downloads chat history in a file  

### 10. Application Routing

- Navigating to "Virtual Security Assistant" (App2) or other apps changes route and loads correct chat assistant  

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)  
- npm or yarn package manager  
- Git  

### Installation

```bash
git clone https://github.com/yourusername/azure-infosec-chat-app.git
cd azure-infosec-chat-app
npm install


