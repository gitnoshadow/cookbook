"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type RecipeDetail = {
  id: number;
  name: string;
  description: string | null;
  photoUrl: string | null;
  ingredients: string | null;
  steps: string | null;
  cookingTime: number | null;
  difficulty: string | null;
  seasoningPowders: { seasoningPowder: { id: number; name: string } }[];
};

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("確定要刪除此食譜嗎？")) return;
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/recipes");
  };

  if (loading) return <div className="text-center py-20 text-4xl">⏳</div>;
  if (!data) return <div className="text-center py-20">找不到此食譜</div>;

  const ingredients: string[] = data.ingredients ? JSON.parse(data.ingredients) : [];
  const steps: string[] = data.steps ? JSON.parse(data.steps) : [];

  return (
    <div>
      <div className="cute-card overflow-hidden mb-8">
        <div className="h-56 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center text-7xl">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" />
          ) : "🍳"}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#5d4037" }}>{data.name}</h1>
              {data.description && <p style={{ color: "#8d6e63" }}>{data.description}</p>}
              <div className="flex gap-4 mt-3 text-sm" style={{ color: "#8d6e63" }}>
                {data.cookingTime && <span>⏱ {data.cookingTime} 分鐘</span>}
                {data.difficulty && <span>📊 {data.difficulty}</span>}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/recipes/${id}/edit`} className="cute-btn" style={{ background: "#fff3e0", color: "#e65100" }}>
                ✏️ 編輯
              </Link>
              <button onClick={handleDelete} className="cute-btn" style={{ background: "#ffebee", color: "#c62828" }}>
                🗑️ 刪除
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {data.seasoningPowders.map((sp) => (
              <Link
                key={sp.seasoningPowder.id}
                href={`/seasonings/${sp.seasoningPowder.id}`}
                className="cute-btn text-sm"
                style={{ background: "#ffd6e0", color: "#e85d7d" }}
              >
                🧂 {sp.seasoningPowder.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="cute-card p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#5d4037" }}>🥘 食材</h2>
          {ingredients.length === 0 ? (
            <p style={{ color: "#8d6e63" }}>未記錄食材</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#ff8fab" }}></span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cute-card p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#5d4037" }}>👩‍🍳 做法</h2>
          {steps.length === 0 ? (
            <p style={{ color: "#8d6e63" }}>未記錄做法步驟</p>
          ) : (
            <ol className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5" style={{ background: "#ff8fab" }}>
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
