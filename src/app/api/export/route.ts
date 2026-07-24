import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [seasonings, recipes] = await Promise.all([
    prisma.seasoningPowder.findMany({
      include: {
        recipes: {
          include: { recipe: true },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.recipe.findMany({
      include: {
        seasoningPowders: {
          include: { seasoningPowder: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const exportData = {
    exportedAt: new Date().toISOString(),
    seasonings: seasonings.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      imageUrl: s.imageUrl,
      recipes: s.recipes.map((r) => ({
        id: r.recipe.id,
        name: r.recipe.name,
      })),
    })),
    recipes: recipes.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      photoUrl: r.photoUrl,
      ingredients: r.ingredients,
      steps: r.steps,
      cookingTime: r.cookingTime,
      difficulty: r.difficulty,
      isFavorited: r.isFavorited,
      seasoningPowders: r.seasoningPowders.map((sp) => ({
        id: sp.seasoningPowder.id,
        name: sp.seasoningPowder.name,
      })),
    })),
  };

  return NextResponse.json(exportData, {
    headers: {
      "Content-Disposition": 'attachment; filename="cookbook-backup.json"',
      "Content-Type": "application/json",
    },
  });
}
