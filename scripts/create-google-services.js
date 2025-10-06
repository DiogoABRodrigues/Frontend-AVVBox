import fs from "fs";
import path from "path";

const googleServicesPath = path.join("android/app/google-services.json");

const filePath = process.env.GOOGLE_SERVICES_JSON;

if (!filePath) {
  console.error("⚠️ Variável GOOGLE_SERVICES_JSON não definida!");
  process.exit(1);
}

try {
  // Lê o ficheiro temporário fornecido pelo EAS
  const rawContent = fs.readFileSync(filePath, "utf-8");

  fs.mkdirSync(path.dirname(googleServicesPath), { recursive: true });
  fs.writeFileSync(googleServicesPath, rawContent);

  console.log("✅ google-services.json criado com sucesso!");
} catch (e) {
  console.error("❌ Erro ao ler/escrever google-services.json:", e);
  process.exit(1);
}
