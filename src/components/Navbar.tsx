"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white cute-shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold" style={{ color: "#ff8fab" }}>
          <img src="/cat-paw.svg" alt="貓掌" className="w-7 h-7" />
          <span>喵喵の調味粉食譜筆記本</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/seasonings" className="hover:opacity-70 transition-opacity" style={{ color: "#5d4037" }}>
            所有調味粉
          </Link>
          <Link href="/recipes" className="hover:opacity-70 transition-opacity" style={{ color: "#5d4037" }}>
            所有食譜
          </Link>
          <Link href="/favorites" className="hover:opacity-70 transition-opacity" style={{ color: "#5d4037" }}>
            ⭐ 我的最愛
          </Link>
          <button onClick={async () => {
            const res = await fetch("/api/export");
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cookbook-backup.json";
            a.click();
            URL.revokeObjectURL(url);
          }} className="hover:opacity-70 transition-opacity text-sm cursor-pointer" style={{ color: "#5d4037" }}>
            📥 匯出
          </button>
          <Link
            href="/seasonings/new"
            className="cute-btn text-white"
            style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
          >
            ＋ 新增調味粉
          </Link>
        </div>
      </div>
    </nav>
  );
}
