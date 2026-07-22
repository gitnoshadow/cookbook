"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function NewSeasoningPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#5d4037" }}>✨ 新增調味粉</h1>
      <form onSubmit={handleSubmit} className="cute-card p-6 flex flex-col gap-5">
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🧂 調味粉名稱</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="例如：咖哩粉、胡椒粉..."
            className="cute-input w-full"
            required
          />
        </div>
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📝 描述（選填）</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="簡單介紹這個調味粉..."
            rows={3}
            className="cute-input w-full resize-none"
          />
        </div>
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📸 封面照片（選填）</label>
          <ImageUpload
            currentImage={form.imageUrl}
            onUpload={(url) => setForm({ ...form, imageUrl: url })}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="cute-btn text-white text-center py-3 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
        >
          {saving ? "儲存中..." : "💾 儲存調味粉"}
        </button>
      </form>
    </div>
  );
}
