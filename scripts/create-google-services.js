import fs from 'fs';
import path from 'path';

const googleServicesPath = path.join('android/app/google-services.json');

if (!process.env.GOOGLE_SERVICES_JSON) {
  console.error('⚠️ Variável GOOGLE_SERVICES_JSON não definida!');
  process.exit(1);
}

// Garante que o diretório existe
fs.mkdirSync(path.dirname(googleServicesPath), { recursive: true });

// Escreve o JSON no caminho correto
fs.writeFileSync(
  googleServicesPath,
  process.env.GOOGLE_SERVICES_JSON
);

console.log('google-services.json criado com sucesso!');
