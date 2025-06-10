// src/components/azuretopbar.tsx
import React, { useRef, useEffect } from 'react';
import {
  Stack,
  IconButton,
  SearchBox,
  Persona,
  PersonaSize,
  Text,
  initializeIcons,
} from '@fluentui/react';
import { Sidebar } from './azuresidebar';
import styles from './azuretopbar.module.css';

initializeIcons();

export interface AzureTopBarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AzureTopBar: React.FC<AzureTopBarProps> = ({ collapsed, onToggle }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Only collapse the sidebar on outside clicks if it's currently expanded
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElem = sidebarRef.current;
      const topBarElem = topBarRef.current;
      const target = event.target as Node;

      // If sidebar is expanded (collapsed === false) AND click was outside both sidebar & topbar, then collapse
      if (
        !collapsed &&
        sidebarElem &&
        topBarElem &&
        !sidebarElem.contains(target) &&
        !topBarElem.contains(target)
      ) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed, onToggle]); // include collapsed & onToggle here

  // When the hamburger is clicked, just call onToggle (it will expand/collapse). 
  // No additional logic needed.
  const toggleSidebar = () => onToggle();

  const doSearch = async (query: string) => {
    if (!query?.trim()) return;
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Search error ${res.status}`);
      const results = await res.json();
      console.log('Search results:', results);
      // TODO: display results in a dropdown or navigate, etc.
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <>
      {/* Render Sidebar (so it can share the same collapsed state & be referenced by ref) */}
      <Sidebar ref={sidebarRef} collapsed={collapsed} onToggle={onToggle} />

      {/* TopBar itself */}
      <div ref={topBarRef}>
        <Stack
          horizontal
          verticalAlign="center"
          horizontalAlign="space-between"
          className={styles.azureTopBar}
        >
          {/* Hamburger button */}
          <IconButton
            iconProps={{ iconName: 'GlobalNavButton' }}
            title="Toggle navigation"
            ariaLabel="Toggle navigation"
            onClick={toggleSidebar}
            className={
              collapsed
                ? styles.hamburgerButton
                : `${styles.hamburgerButton} ${styles.hamburgerExpanded}`
            }
          />

          {/* “Information Security Team” */}
          <div className={styles.azureTitleContainer}>
            <Text
              variant="mediumPlus"
              className={styles.azureTitle}
              onClick={() => {
                window.location.href = 'https://portal.azure.com';
              }}
            >
              Information Security Team
            </Text>
          </div>

          {/* Search box in the center */}
          <Stack grow horizontalAlign="center" styles={{ root: { flex: 1 } }}>
            <SearchBox
              placeholder="Search resources, services, and docs (G+/)"
              className={styles.azureSearchBox}
              onSearch={newValue => {
                 doSearch(newValue || '');
          }}
            />
          </Stack>

          {/* Right-edge buttons */}
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 0 }}
            styles={{ root: { marginRight: 0 } }}
          >
            <IconButton
              iconProps={{ iconName: 'Ringer' }}
              title="Notifications"
              ariaLabel="Notifications"
              className={styles.rightIconButton}
            />
            <IconButton
              iconProps={{ iconName: 'Settings' }}
              title="Settings"
              ariaLabel="Settings"
              className={styles.rightIconButton}
            />
            <IconButton
              iconProps={{ iconName: 'Help' }}
              title="Help"
              ariaLabel="Help"
              className={styles.rightIconButton}
            />
            <Persona
              text="DC"
              size={PersonaSize.size32}
              hidePersonaDetails
              className={styles.azurePersona}
            />
          </Stack>
        </Stack>
      </div>
    </>
  );
};
