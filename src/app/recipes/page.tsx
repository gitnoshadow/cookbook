"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";

type Recipe = {
  id: number;
  name: string;
  description: string | null;
  photoUrl: string | null;
  cookingTime: number | null;
  difficulty: string | null;
  seasoningPowders: { seasoningPowder: { id: number; name: string } }[];
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recipes").then((r) => r.json()).then(setRecipes);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#5d4037" }}>🍽️ 所有食譜</h1>
        <Link
          href="/recipes/new"
          className="cute-btn text-white"
          style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
        >
          ＋ 新增食譜
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🍳</p>
          <p className="text-lg" style={{ color: "#8d6e63" }}>還沒有任何食譜，快來新增第一道吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <div key={r.id} className="relative">
              <RecipeCard
                id={r.id}
                name={r.name}
                description={r.description}
                photoUrl={r.photoUrl}
                cookingTime={r.cookingTime}
                difficulty={r.difficulty}
              />
              <div className="flex flex-wrap gap-1 mt-2 px-1">
                {r.seasoningPowders.map((sp) => (
                  <Link
                    key={sp.seasoningPowder.id}
                    href={`/seasonings/${sp.seasoningPowder.id}`}
                    className="text-xs rounded-full px-2 py-0.5 hover:opacity-70"
                    style={{ background: "#ffd6e0", color: "#e85d7d" }}
                  >
                    🧂 {sp.seasoningPowder.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
