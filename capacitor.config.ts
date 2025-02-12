import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yemekoneri.app',
  appName: 'Yemek Öneri',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    url: 'http://10.0.2.2:3000',
    cleartext: true,
    allowNavigation: ['*']
  },
  ios: {
    contentInset: 'always',
    backgroundColor: '#ffffff',
    limitsNavigationsToAppBoundDomains: false,
    scheme: 'app'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#999999",
      iosSpinnerStyle: "small"
    }
  }
};

export default config;
