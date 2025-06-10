// src/config/appConfig.ts

export interface AppInfo {
  title: string;
  iconName: string;
}

// The keys “'1'”, “'2'”, etc. correspond to your /app1, /app2, … routes
export const appConfig: Record<string, AppInfo> = {
  '1': { title: 'Virtual Security Assistant', iconName: 'Shield' },
  '2': { title: 'Security Tools',           iconName: 'Bank'   },
  '3': { title: 'Infosec',                   iconName: 'Lock'   },
  '4': { title: 'Other Tools',               iconName: 'Money'  },
};
