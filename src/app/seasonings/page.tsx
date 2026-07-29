import Link from "next/link";
import SeasoningCard from "@/components/SeasoningCard";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SeasoningsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";

  const seasonings = await prisma.seasoningPowder.findMany({
    where: query ? { name: { contains: query } } : undefined,
    include: { _count: { select: { recipes: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#5d4037" }}>
          {query ? `🔍 搜尋「${query}」的結果` : "🧂 所有調味粉"}
        </h1>
        <Link
          href="/seasonings/new"
          className="cute-btn text-white"
          style={{ background: "linear-gradient(135deg, #ff8fab, #e85d7d)" }}
        >
          ＋ 新增調味粉
        </Link>
      </div>

      {seasonings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🧂</p>
          <p className="text-lg" style={{ color: "#8d6e63" }}>
            {query ? "沒有找到符合的調味粉，換個關鍵字試試？" : "還沒有任何調味粉，點擊上方按鈕新增吧！"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {seasonings.map((s) => (
            <SeasoningCard
              key={s.id}
              id={s.id}
              name={s.name}
              description={s.description}
              imageUrl={s.imageUrl}
              recipeCount={s._count.recipes}
              flavorProfile={s.flavorProfile}
            />
          ))}
        </div>
      )}
    </div>
  );
}
