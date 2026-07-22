"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import SeasoningCard from "@/components/SeasoningCard";
import RecipeCard from "@/components/RecipeCard";

type Seasoning = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  _count: { recipes: number };
};

type Recipe = {
  id: number;
  name: string;
  description: string | null;
  photoUrl: string | null;
  cookingTime: number | null;
  difficulty: string | null;
};

export default function HomePage() {
  const [seasonings, setSeasonings] = useState<Seasoning[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/seasonings").then((r) => r.json()).then(setSeasonings);
    fetch("/api/recipes").then((r) => r.json()).then(setRecipes);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#5d4037" }}>
          🐾 喵喵の調味粉食譜筆記本
        </h1>
        <p className="text-lg mb-8" style={{ color: "#8d6e63" }}>
          想知道家裡的調味粉能做出什麼料理嗎？喵～來搜尋看看吧！🐱
        </p>
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </section>

      {/* Seasonings */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "#5d4037" }}>🧂 調味粉一覽</h2>
          <Link href="/seasonings" className="text-sm font-medium hover:opacity-70" style={{ color: "#e85d7d" }}>
            查看全部 →
          </Link>
        </div>
        {seasonings.length === 0 ? (
          <div className="text-center py-10 rounded-2xl" style={{ background: "#fff5f7" }}>
            <p className="text-lg mb-3" style={{ color: "#8d6e63" }}>還沒有調味粉，快來新增吧！</p>
            <Link
              href="/seasonings/new"
              className="cute-btn text-white inline-block"
              style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
            >
              ＋ 新增調味粉
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {seasonings.slice(0, 10).map((s) => (
              <SeasoningCard
                key={s.id}
                id={s.id}
                name={s.name}
                description={s.description}
                imageUrl={s.imageUrl}
                recipeCount={s._count.recipes}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent Recipes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "#5d4037" }}>🍽️ 最新食譜</h2>
          <Link href="/recipes" className="text-sm font-medium hover:opacity-70" style={{ color: "#e85d7d" }}>
            查看全部 →
          </Link>
        </div>
        {recipes.length === 0 ? (
          <div className="text-center py-10 rounded-2xl" style={{ background: "#fff5f7" }}>
            <p className="text-lg mb-3" style={{ color: "#8d6e63" }}>還沒有食譜，快來新增第一道吧！</p>
            <Link
              href="/recipes/new"
              className="cute-btn text-white inline-block"
              style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
            >
              ＋ 新增食譜
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.slice(0, 6).map((r) => (
              <RecipeCard
                key={r.id}
                id={r.id}
                name={r.name}
                description={r.description}
                photoUrl={r.photoUrl}
                cookingTime={r.cookingTime}
                difficulty={r.difficulty}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
