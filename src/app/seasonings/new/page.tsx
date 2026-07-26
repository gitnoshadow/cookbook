"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

type SearchResult = { id: number; name: string; description: string | null };

export default function NewSeasoningPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", description: "", imageUrl: "",
    brand: "", ingredients: "", flavorProfile: "", mainUse: "", pairingSuggestions: "",
  });
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timer = setTimeout(() => {
      fetch(`/api/seasonings?q=${encodeURIComponent(searchQuery)}`).then((r) => r.json()).then(setSearchResults);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("請輸入調味粉名稱");
    setSaving(true);
    const res = await fetch("/api/seasonings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/seasonings");
    } else {
      const data = await res.json();
      alert(data.error || "新增失敗");
      setSaving(false);
    }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#5d4037" }}>✨ 新增調味粉</h1>

      <div className="cute-card p-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 搜尋現有的調味粉..."
          className="cute-input w-full"
        />
        {searchResults.length > 0 && (
          <div className="mt-3 flex flex-col gap-2 max-h-48 overflow-y-auto">
            {searchResults.map((s) => (
              <Link key={s.id} href={`/seasonings/${s.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 transition-colors">
                <span className="text-lg">🧂</span>
                <div>
                  <span className="font-medium text-sm" style={{ color: "#5d4037" }}>{s.name}</span>
                  {s.description && <span className="text-xs ml-2" style={{ color: "#8d6e63" }}>{s.description}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="cute-card p-6 flex flex-col gap-5">
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🧂 調味粉名稱</label>
          <input value={form.name} onChange={set("name")} placeholder="例如：咖哩粉、胡椒粉..." className="cute-input w-full" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-2 text-sm" style={{ color: "#5d4037" }}>🏷️ 品牌</label>
            <input value={form.brand} onChange={set("brand")} placeholder="例如：小磨坊..." className="cute-input w-full" />
          </div>
          <div>
            <label className="font-semibold block mb-2 text-sm" style={{ color: "#5d4037" }}>📋 成分</label>
            <input value={form.ingredients} onChange={set("ingredients")} placeholder="例如：辣椒、鹽..." className="cute-input w-full" />
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🌿 風味描述</label>
          <textarea value={form.flavorProfile} onChange={set("flavorProfile")} placeholder="例如：微辣帶有濃郁香氣..." rows={2} className="cute-input w-full resize-none" />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🍳 主要用途</label>
          <textarea value={form.mainUse} onChange={set("mainUse")} placeholder="例如：適合燉煮、醃肉..." rows={2} className="cute-input w-full resize-none" />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🤝 搭配建議</label>
          <textarea value={form.pairingSuggestions} onChange={set("pairingSuggestions")} placeholder="例如：搭配大蒜、洋蔥更香..." rows={2} className="cute-input w-full resize-none" />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📝 描述（選填）</label>
          <textarea value={form.description} onChange={set("description")} placeholder="簡單介紹這個調味粉..." rows={3} className="cute-input w-full resize-none" />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📸 封面照片（選填）</label>
          <ImageUpload currentImage={form.imageUrl} onUpload={(url) => setForm({ ...form, imageUrl: url })} />
        </div>

        <button type="submit" disabled={saving} className="cute-btn text-white text-center py-3 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}>
          {saving ? "儲存中..." : "💾 儲存調味粉"}
        </button>
      </form>
    </div>
  );
}
