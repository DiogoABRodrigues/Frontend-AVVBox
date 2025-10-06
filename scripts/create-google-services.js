import fs from "fs";
import path from "path";

const googleServicesPath = path.join("android/app/google-services.json");

const rawValue = process.env.GOOGLE_SERVICES_JSON;

if (!rawValue) {
  console.error("⚠️ Variável GOOGLE_SERVICES_JSON não definida!");
  process.exit(1);
}

try {
  // Se o valor for um JSON válido (EAS envia o ficheiro como texto completo)
  const json = JSON.parse(rawValue);

  fs.mkdirSync(path.dirname(googleServicesPath), { recursive: true });
  fs.writeFileSync(googleServicesPath, JSON.stringify(json, null, 2));

  console.log("✅ google-services.json criado com sucesso!");
} catch {
  console.error("❌ Erro ao analisar GOOGLE_SERVICES_JSON. Verifica se o valor é um JSON válido.");
  process.exit(1);
}
