import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d711caea1dc14eccae005dbdd9c8605b',
  appName: 'genius-inkwell',
  webDir: 'dist',
  server: {
    url: 'https://d711caea-1dc1-4ecc-ae00-5dbdd9c8605b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;