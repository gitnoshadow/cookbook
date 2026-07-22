const { execSync, spawn } = require("child_process");

console.log("⏳ 同步資料庫結構...");
try {
  const output = execSync("npx prisma db push --accept-data-loss", { encoding: "utf8" });
  console.log(output);
  console.log("✅ 資料庫同步完成");
} catch (e) {
  console.error("⚠️ 資料庫同步失敗");
  if (e.stdout) console.log(e.stdout);
  if (e.stderr) console.error(e.stderr);
  console.error(e.message || e);
}

console.log("🚀 啟動 Next.js...");
spawn("npx", ["next", "start"], { stdio: "inherit", env: { ...process.env } }).on("exit", (code) => {
  process.exit(code ?? 1);
});
