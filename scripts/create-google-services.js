import fs from 'fs';
import path from 'path';

const googleServicesPath = path.join('android', 'app', 'google-services.json');

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
