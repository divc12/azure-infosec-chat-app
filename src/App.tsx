// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AzureTopBar } from './components/azuretopbar';
import { Sidebar } from './components/azuresidebar';
import Dashboard from './components/dashboard';
import ApplicationPage from './components/ApplicationPage';

export const App: React.FC = () => {
  // 1. Keep collapsed state here:
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarWidth = isCollapsed ? 48 : 240; // must match the same numbers in CSS

  return (
    <Router>
      {/* 2. Tell AzureTopBar whether it is collapsed, and give it the toggle callback */}
      <AzureTopBar collapsed={isCollapsed}
        onToggle={() => setIsCollapsed(prev => !prev)}
      />

      <div style={{ display: 'flex', paddingTop: 12 /* leave room for topbar */ }}>
        {/* 3. Render the Sidebar here as well, using the same props */}
        <Sidebar
          collapsed={isCollapsed}
          onToggle={() => setIsCollapsed(prev => !prev)}
        />

        {/* 4. Main content area must always be shifted right by sidebarWidth */}
        <div
          style={{
            marginLeft: sidebarWidth,
            flex: 1,
            padding: 16,
            backgroundColor: 'var(--bg-gray)',
            minHeight: 'calc(100vh - 48px)', // fill below topbar
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/app1" element={<ApplicationPage />} />
            <Route path="/app2" element={<ApplicationPage />} />
            <Route path="/app3" element={<ApplicationPage />} />
            <Route path="/app4" element={<ApplicationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
