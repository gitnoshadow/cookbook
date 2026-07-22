"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import StepsEditor from "@/components/StepsEditor";

type Seasoning = { id: number; name: string };

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [seasonings, setSeasonings] = useState<Seasoning[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    photoUrl: "",
    ingredients: [""],
    steps: [""],
    cookingTime: "",
    difficulty: "",
    seasoningPowderIds: [] as number[],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/seasonings").then((r) => r.json()),
      fetch(`/api/recipes/${id}`).then((r) => r.json()),
    ]).then(([sList, recipe]) => {
      setSeasonings(sList);
      setForm({
        name: recipe.name,
        description: recipe.description || "",
        photoUrl: recipe.photoUrl || "",
        ingredients: recipe.ingredients ? JSON.parse(recipe.ingredients) : [""],
        steps: recipe.steps ? JSON.parse(recipe.steps) : [""],
        cookingTime: recipe.cookingTime?.toString() || "",
        difficulty: recipe.difficulty || "",
        seasoningPowderIds: recipe.seasoningPowders.map((sp: { seasoningPowder: { id: number } }) => sp.seasoningPowder.id),
      });
      setLoading(false);
    });
  }, [id]);

  const toggleSeasoning = (sid: number) => {
    setForm((f) => ({
      ...f,
      seasoningPowderIds: f.seasoningPowderIds.includes(sid)
        ? f.seasoningPowderIds.filter((i) => i !== sid)
        : [...f.seasoningPowderIds, sid],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("請輸入食譜名稱");
    if (form.seasoningPowderIds.length === 0) return alert("請選擇至少一個調味粉");
    setSaving(true);
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        ingredients: form.ingredients.filter(Boolean),
        steps: form.steps.filter(Boolean),
        cookingTime: form.cookingTime || null,
      }),
    });
    if (res.ok) {
      router.push(`/recipes/${id}`);
    } else {
      const data = await res.json();
      alert(data.error || "更新失敗");
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-4xl">⏳</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#5d4037" }}>✏️ 編輯食譜</h1>
      <form onSubmit={handleSubmit} className="cute-card p-6 flex flex-col gap-5">
        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🍽️ 食譜名稱</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="cute-input w-full" required />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📝 簡介</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="cute-input w-full resize-none" />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📸 食譜照片</label>
          <ImageUpload currentImage={form.photoUrl} onUpload={(url) => setForm({ ...form, photoUrl: url })} />
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🧂 使用的調味粉（可複選）</label>
          <div className="flex flex-wrap gap-2">
            {seasonings.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleSeasoning(s.id)}
                className="cute-btn text-sm px-4 py-2 border-2"
                style={{
                  borderColor: form.seasoningPowderIds.includes(s.id) ? "#ff8fab" : "#fce4ec",
                  background: form.seasoningPowderIds.includes(s.id) ? "#ffd6e0" : "white",
                  color: "#5d4037",
                }}
              >
                {form.seasoningPowderIds.includes(s.id) ? "✅ " : ""}{s.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>🥘 食材</label>
          {form.ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={ing} onChange={(e) => { const ni = [...form.ingredients]; ni[i] = e.target.value; setForm({ ...form, ingredients: ni }); }} placeholder={`食材 ${i + 1}`} className="cute-input flex-1" />
              {form.ingredients.length > 1 && <button type="button" onClick={() => setForm({ ...form, ingredients: form.ingredients.filter((_, j) => j !== i) })} className="text-lg">❌</button>}
            </div>
          ))}
          <button type="button" onClick={() => setForm({ ...form, ingredients: [...form.ingredients, ""] })} className="cute-btn text-sm" style={{ color: "#e85d7d" }}>＋ 新增食材</button>
        </div>

        <StepsEditor steps={form.steps} onChange={(steps) => setForm({ ...form, steps })} />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>⏱ 烹調時間</label>
            <input type="number" value={form.cookingTime} onChange={(e) => setForm({ ...form, cookingTime: e.target.value })} placeholder="分鐘" className="cute-input w-full" />
          </div>
          <div className="flex-1">
            <label className="font-semibold block mb-2" style={{ color: "#5d4037" }}>📊 難易度</label>
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="cute-input w-full">
              <option value="">請選擇</option>
              <option value="簡單">😊 簡單</option>
              <option value="中等">🤔 中等</option>
              <option value="困難">😤 困難</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={saving} className="cute-btn text-white text-center py-3 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}>
          {saving ? "儲存中..." : "💾 更新食譜"}
        </button>
      </form>
    </div>
  );
}
