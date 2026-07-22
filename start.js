const { execSync, spawn } = require("child_process");

console.log("⏳ 建立/同步資料庫...");
try {
  const out = execSync("npx prisma db push --accept-data-loss", { encoding: "utf8" });
  console.log(out);
  console.log("✅ 資料庫同步完成");
} catch (e) {
  if (e.stdout) console.log(e.stdout);
  if (e.stderr) console.error(e.stderr);
  console.error("⚠️ 資料庫同步失敗:", e.message || e);
}

console.log("🚀 啟動 Next.js...");
spawn("npx", ["next", "start"], { stdio: "inherit", env: { ...process.env } }).on("exit", (code) => {
  process.exit(code ?? 1);
});
