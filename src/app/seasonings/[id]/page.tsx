"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";

type SeasoningDetail = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  recipes: { recipe: {
    id: number;
    name: string;
    description: string | null;
    photoUrl: string | null;
    cookingTime: number | null;
    difficulty: string | null;
    isFavorited: boolean;
  } }[];
};

export default function SeasoningDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<SeasoningDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/seasonings/${id}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("確定要刪除此調味粉嗎？")) return;
    const res = await fetch(`/api/seasonings/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/seasonings");
  };

  if (loading) return <div className="text-center py-20 text-4xl">⏳</div>;
  if (!data) return <div className="text-center py-20">找不到此調味粉</div>;

  return (
    <div>
      <div className="cute-card p-8 mb-8">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #ffd6e0, #fff5f7)" }}>
            {data.imageUrl ? (
              <img src={data.imageUrl} alt={data.name} className="w-full h-full rounded-full object-cover" />
            ) : "🧂"}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#5d4037" }}>{data.name}</h1>
            {data.description && <p style={{ color: "#8d6e63" }}>{data.description}</p>}
            <p className="text-sm mt-2" style={{ color: "#e85d7d" }}>📖 共 {data.recipes.length} 道食譜</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/seasonings/${id}/edit`}
              className="cute-btn"
              style={{ background: "#fff3e0", color: "#e65100" }}
            >
              ✏️ 編輯
            </Link>
            <button onClick={handleDelete} className="cute-btn" style={{ background: "#ffebee", color: "#c62828" }}>
              🗑️ 刪除
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: "#5d4037" }}>🍽️ 相關食譜</h2>
        <Link
          href={`/recipes/new?seasoningId=${id}`}
          className="cute-btn text-white"
          style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
        >
          ＋ 新增食譜
        </Link>
      </div>

      {data.recipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🍳</p>
          <p style={{ color: "#8d6e63" }}>還沒有食譜，快來新增第一道吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recipes.map((r) => (
              <RecipeCard
              key={r.recipe.id}
              id={r.recipe.id}
              name={r.recipe.name}
              description={r.recipe.description}
              photoUrl={r.recipe.photoUrl}
              cookingTime={r.recipe.cookingTime}
              difficulty={r.recipe.difficulty}
              isFavorited={r.recipe.isFavorited}
              onFavoriteToggle={(id, newState) => setData(prev => prev ? { ...prev, recipes: prev.recipes.map(r => r.recipe.id === id ? { ...r, recipe: { ...r.recipe, isFavorited: newState } } : r) } : prev)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
