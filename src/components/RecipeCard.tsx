"use client";

import { useState } from "react";
import Link from "next/link";
import HeartIcon from "./HeartIcon";

type RecipeCardProps = {
  id: number;
  name: string;
  description: string | null;
  photoUrl: string | null;
  cookingTime: number | null;
  difficulty: string | null;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: number, newState: boolean) => void;
};

export default function RecipeCard({ id, name, description, photoUrl, cookingTime, difficulty, isFavorited, onFavoriteToggle }: RecipeCardProps) {
  const [fav, setFav] = useState(isFavorited ?? false);

  const handleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !fav;
    setFav(newState);
    const res = await fetch(`/api/recipes/${id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorited: newState }),
    });
    if (!res.ok) setFav(!newState);
    else onFavoriteToggle?.(id, newState);
  };

  return (
    <div className="relative">
      <Link href={`/recipes/${id}`}>
        <div className="cute-card overflow-hidden h-full flex flex-col">
          <div className="h-40 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center text-5xl overflow-hidden">
            {photoUrl ? (
              <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              "🍳"
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col gap-2">
            <h3 className="font-bold text-base" style={{ color: "#5d4037" }}>{name}</h3>
            {description && (
              <p className="text-xs line-clamp-2" style={{ color: "#8d6e63" }}>{description}</p>
            )}
            <div className="flex gap-3 mt-auto text-xs" style={{ color: "#8d6e63" }}>
              {cookingTime && <span>⏱ {cookingTime} 分鐘</span>}
              {difficulty && <span>📊 {difficulty}</span>}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleFav}
        className="absolute top-3 right-3 text-xl transition-transform hover:scale-110 active:scale-90"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
      >
        <HeartIcon filled={fav} size={22} />
      </button>
    </div>
  );
}
