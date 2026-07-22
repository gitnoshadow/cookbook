"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/seasonings?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 搜尋調味粉，例如：咖哩粉、胡椒粉..."
        className="cute-input w-full h-14 pl-6 pr-16 text-lg"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 cute-btn text-white px-6"
        style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
      >
        搜尋
      </button>
    </form>
  );
}
