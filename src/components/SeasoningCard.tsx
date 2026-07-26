import Link from "next/link";

type SeasoningCardProps = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  recipeCount: number;
  flavorProfile?: string | null;
};

export default function SeasoningCard({ id, name, description, imageUrl, recipeCount, flavorProfile }: SeasoningCardProps) {
  return (
    <Link href={`/seasonings/${id}`}>
      <div className="cute-card p-5 h-full flex flex-col items-center text-center gap-3">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg, #ffd6e0, #fff5f7)" }}>
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            "🧂"
          )}
        </div>
        <h3 className="font-bold text-lg" style={{ color: "#5d4037" }}>{name}</h3>
        {flavorProfile && (
          <p className="text-xs line-clamp-2" style={{ color: "#8d6e63" }}>🌿 {flavorProfile}</p>
        )}
        {description && (
          <p className="text-xs line-clamp-2" style={{ color: "#bcaaa4" }}>{description}</p>
        )}
        <span className="text-xs rounded-full px-3 py-1" style={{ background: "#ffd6e0", color: "#e85d7d" }}>
          📖 {recipeCount} 道食譜
        </span>
      </div>
    </Link>
  );
}
