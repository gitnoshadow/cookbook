const { execSync, spawn } = require("child_process");

console.log("⏳ 同步資料庫結構...");
try {
  execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" });
  console.log("✅ 資料庫同步完成");
} catch (e) {
  console.error("⚠️ 資料庫同步失敗", e.message);
}

console.log("🚀 啟動 Next.js...");
spawn("npx", ["next", "start"], { stdio: "inherit", env: { ...process.env } }).on("exit", (code) => {
  process.exit(code ?? 1);
});
