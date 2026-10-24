// Генерирует PDF-версии CV из страниц /ru/cv и /en/cv через headless Chrome.
// Запускайте при запущенном сервере (npm run dev или npm run start):
//   npm run cv:pdf
// Переменные окружения: CHROME_PATH (путь к Chrome), CV_BASE_URL (по умолчанию http://localhost:3000).
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const baseUrl = process.env.CV_BASE_URL ?? "http://localhost:3000";
const outDir = join(process.cwd(), "public", "cv");

mkdirSync(outDir, { recursive: true });

for (const lang of ["ru", "en"]) {
  const file = join(outDir, `${lang}.pdf`);
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=5000",
      `--print-to-pdf=${file}`,
      `${baseUrl}/${lang}/cv`,
    ],
    { stdio: "inherit" },
  );
  console.log(`Saved ${file}`);
}
