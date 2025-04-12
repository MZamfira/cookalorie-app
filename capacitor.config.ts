
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7e499a2fa17d45a58452b4a17e271c82',
  appName: 'tasty-local-ai-meals-73',
  webDir: 'dist',
  server: {
    url: 'https://7e499a2f-a17d-45a5-8452-b4a17e271c82.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;
