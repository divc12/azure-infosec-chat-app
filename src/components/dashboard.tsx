// dashboard.tsx
import React from 'react';
import { Icon, Text } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

// Import the shared appConfig
import { appConfig } from '../config/appConfig';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

 // Build an array of all valid app IDs in ascending order:
  const appIds = Object.keys(appConfig).sort(); // ['1','2','3','4']

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {appIds.map((appId) => {
          const { title, iconName } = appConfig[appId];
          return (
            <div
              key={appId}
              className={styles.tile}
              onClick={() => navigate(`/app${appId}`)}
            >
              <Icon iconName={iconName} className={styles.tileIcon} />
              <Text variant="mediumPlus" className={styles.tileText}>
                {title}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;