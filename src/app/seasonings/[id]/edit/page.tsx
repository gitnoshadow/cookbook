"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function EditSeasoningPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/seasonings/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setForm({ name: d.name, description: d.description || "", imageUrl: d.imageUrl || "" });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("請輸入調味粉名稱");
    setSaving(true);
    const res = await fetch(`/api/seasonings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push(`/seasonings/${id}`);
    } else {
      alert("更新失敗");
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-4xl">⏳</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#5d4037" }}>✏️ 編輯調味粉</h1>
      <form onSubmit={handleSubmit} className="cute-card p-6 flex flex-col gap-5">
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🧂 調味粉名稱</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="cute-input w-full"
            required
          />
        </div>
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📝 描述</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="cute-input w-full resize-none"
          />
        </div>
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📸 封面照片</label>
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
          {saving ? "儲存中..." : "💾 更新調味粉"}
        </button>
      </form>
    </div>
  );
}
