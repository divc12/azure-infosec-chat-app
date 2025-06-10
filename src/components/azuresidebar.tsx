// src/components/azuresidebar.tsx
import React, { forwardRef } from 'react';
import { Stack, Icon } from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './azuresidebar.module.css';

// Import the SVG “S” logo
import { ReactComponent as SLogo } from '../assets/s-logo.svg';

const homeIcon = { iconName: 'Home' };
const shieldIcon = { iconName: 'Shield' };
const bankIcon = { iconName: 'Bank' };
const lockIcon = { iconName: 'Lock' };
const moneyIcon = { iconName: 'Money' };

export const SIDEBAR_EXPANDED_WIDTH = 240;  // must match App.tsx
export const SIDEBAR_COLLAPSED_WIDTH = 48;

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

/**
 * We forwardRef so that AzureTopBar’s click‐outside logic can see this DOM node.
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsed, onToggle }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname; // e.g. "/", "/app1", "/app2", …

    // Helper to decide if a menu item is active:
    const isActive = (route: string) => {
      // For Dashboard, route === "/" matches exactly pathname === "/"
      return pathname === route;
    };

    return (
      <div
        ref={ref}
        className={`${styles.sidebarContainer} ${
          collapsed ? 'collapsed' : ''
        }`}
        style={{
          width: collapsed
            ? SIDEBAR_COLLAPSED_WIDTH
            : SIDEBAR_EXPANDED_WIDTH,
        }}
      >
        {/* ── HEADER AREA ── */}
        <div className={styles.headerArea} onClick={onToggle} title="Toggle navigation">
          {/* Hamburger icon */}
          <Icon
            iconName="GlobalNavButton"
            className={styles.sidebarHamburger}
          />

          {/* SVG “S” logo; only when expanded */}
          {!collapsed && (
            <div className={styles.logo}>
              <SLogo width="32" height="32" />
            </div>
          )}
        </div>

        {/* ── ITEMS BELOW ── */}
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { paddingTop: 0 } }}>
          <div
            className={`${styles.sidebarItem} ${
              isActive('/') ? styles.sidebarItemActive : ''
            }`}
            onClick={() => navigate('/')}
          >
            <Icon iconName={homeIcon.iconName!} className={styles.sidebarIcon} />
            {!collapsed && <span className={styles.sidebarLabel}>Dashboard</span>}
          </div>

          <div
            className={`${styles.sidebarItem} ${
              isActive('/app1') ? styles.sidebarItemActive : ''
            }`}
            onClick={() => navigate('/app1')}
          >
            <Icon iconName={shieldIcon.iconName!} className={styles.sidebarIcon} />
            {!collapsed && <span className={styles.sidebarLabel}>Virtual Security Assistant</span>}
          </div>

          <div
            className={`${styles.sidebarItem} ${
              isActive('/app2') ? styles.sidebarItemActive : ''
            }`}
            onClick={() => navigate('/app2')}
          >
            <Icon iconName={bankIcon.iconName!} className={styles.sidebarIcon} />
            {!collapsed && <span className={styles.sidebarLabel}>Security Tools</span>}
          </div>

          <div
            className={`${styles.sidebarItem} ${
              isActive('/app3') ? styles.sidebarItemActive : ''
            }`}
            onClick={() => navigate('/app3')}
          >
            <Icon iconName={lockIcon.iconName!} className={styles.sidebarIcon} />
            {!collapsed && <span className={styles.sidebarLabel}>Infosec</span>}
          </div>

          <div
            className={`${styles.sidebarItem} ${
              isActive('/app4') ? styles.sidebarItemActive : ''
            }`}
            onClick={() => navigate('/app4')}
          >
            <Icon iconName={moneyIcon.iconName!} className={styles.sidebarIcon} />
            {!collapsed && <span className={styles.sidebarLabel}>Other Tools</span>}
          </div>
        </Stack>
      </div>
    );
  }
);
