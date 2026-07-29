"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh] text-center">
      <div className="text-6xl mb-6">😿</div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#5d4037" }}>
        哎呀，發生錯誤了喵！
      </h2>
      <p className="text-md mb-8" style={{ color: "#8d6e63" }}>
        抱歉，無法載入資料，請重新整理試試看。
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="cute-btn text-white"
          style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
        >
          重新整理
        </button>
        <Link
          href="/"
          className="cute-btn bg-white"
          style={{ border: "2px solid #ff8fab", color: "#e85d7d" }}
        >
          回首頁
        </Link>
      </div>
    </div>
  );
}
