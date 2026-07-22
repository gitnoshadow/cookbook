"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";

type RecipeShareCardProps = {
  name: string;
  description: string | null;
  photoUrl: string | null;
  ingredients: string[];
  steps: string[];
  cookingTime: number | null;
  difficulty: string | null;
  seasoningNames: string[];
};

export default function RecipeShareCard({
  name, description, photoUrl, ingredients, steps, cookingTime, difficulty, seasoningNames,
}: RecipeShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("生成圖片失敗");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className="p-6 rounded-3xl max-w-sm"
        style={{
          background: "linear-gradient(145deg, #fff5f7, #ffe8ef)",
          border: "4px solid #ff8fab",
          boxShadow: "0 8px 32px rgba(255,143,171,0.3)",
        }}
      >
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <img src="/cat-paw.svg" alt="cat" className="w-8 h-8" />
            <img src="/cat-paw.svg" alt="cat" className="w-8 h-8" />
            <img src="/cat-paw.svg" alt="cat" className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: "#5d4037" }}>{name}</h2>
          {description && <p className="text-sm mt-1" style={{ color: "#8d6e63" }}>{description}</p>}
          <div className="flex justify-center gap-3 mt-2 text-xs" style={{ color: "#8d6e63" }}>
            {cookingTime && <span>⏱ {cookingTime} 分</span>}
            {difficulty && <span>📊 {difficulty}</span>}
          </div>
        </div>

        {photoUrl && (
          <img src={photoUrl} alt={name} className="w-full h-40 object-cover rounded-2xl mb-4" />
        )}

        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {seasoningNames.map((s) => (
            <span key={s} className="text-xs rounded-full px-3 py-1" style={{ background: "#ffd6e0", color: "#e85d7d" }}>
              🧂 {s}
            </span>
          ))}
        </div>

        {ingredients.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold text-sm mb-2" style={{ color: "#5d4037" }}>🥘 食材</h3>
            <ul className="text-xs flex flex-col gap-1">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff8fab" }}></span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}

        {steps.length > 0 && (
          <div>
            <h3 className="font-bold text-sm mb-2" style={{ color: "#5d4037" }}>👩‍🍳 做法</h3>
            <ol className="text-xs flex flex-col gap-2">
              {steps.slice(0, 5).map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold flex-shrink-0" style={{ color: "#ff8fab" }}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="text-center mt-4 text-xs" style={{ color: "#e85d7d" }}>
          🐾 喵喵の調味粉食譜筆記本
        </div>
      </div>

      <button
        onClick={handleShare}
        className="cute-btn text-white px-8 py-3"
        style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
      >
        📸 下載食譜圖片
      </button>
    </div>
  );
}
