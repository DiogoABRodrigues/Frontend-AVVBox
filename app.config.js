import fs from 'fs';
import path from 'path';

export default () => {
  const googleServicesPath = path.join(__dirname, 'android/app/google-services.json');

  // Cria o google-services.json a partir da variável de ambiente
  if (process.env.GOOGLE_SERVICES_JSON) {
    fs.mkdirSync(path.dirname(googleServicesPath), { recursive: true });

    try {
      const json = JSON.parse(process.env.GOOGLE_SERVICES_JSON);
      fs.writeFileSync(googleServicesPath, JSON.stringify(json, null, 2));
      console.log('✅ google-services.json criado com sucesso!');
    } catch (err) {
      console.error('❌ Erro ao parsear GOOGLE_SERVICES_JSON:', err);
    }
  } else {
    console.warn('⚠️ Variável GOOGLE_SERVICES_JSON não definida!');
  }

  return {
    expo: {
      name: 'AVVBox',
      slug: 'AVVBox',
      version: '1.0.0',
      orientation: 'portrait',
      icon: 'assets/avvb.png',
      userInterfaceStyle: 'light',
      splash: {
        image: 'assets/avvb2.png',
        resizeMode: 'contain',
        backgroundColor: '#191818',
      },
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/avvb.png',
          backgroundColor: '#191818',
        },
        edgeToEdgeEnabled: false,
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
        package: 'com.anonymous.AVVBox',
      },
      web: {
        favicon: 'assets/avvb.png',
      },
      plugins: [
        [
          'expo-notifications',
          { icon: './assets/notification-icon.png' },
        ],
      ],
      extra: {
        eas: {
          projectId: '243d43fd-5861-4710-bc1c-3ee9be00b58f',
        },
      },
    },
  };
};
