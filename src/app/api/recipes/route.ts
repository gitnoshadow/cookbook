import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const seasoningId = searchParams.get("seasoningId");
  const where = seasoningId
    ? { seasoningPowders: { some: { seasoningPowderId: Number(seasoningId) } } }
    : undefined;
  const recipes = await prisma.recipe.findMany({
    where,
    include: {
      seasoningPowders: {
        include: { seasoningPowder: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recipe = await prisma.recipe.create({
      data: {
        name: body.name,
        description: body.description || null,
        photoUrl: body.photoUrl || null,
        ingredients: body.ingredients ? JSON.stringify(body.ingredients) : null,
        steps: body.steps ? JSON.stringify(body.steps) : null,
        cookingTime: body.cookingTime ? Number(body.cookingTime) : null,
        difficulty: body.difficulty || null,
        seasoningPowders: {
          create: (body.seasoningPowderIds as number[] || []).map((id: number) => ({
            seasoningPowderId: id,
          })),
        },
      },
      include: {
        seasoningPowders: {
          include: { seasoningPowder: true },
        },
      },
    });
    return NextResponse.json(recipe, { status: 201 });
  } catch (e: unknown) {
    const m = e instanceof Error ? e.message : String(e);
    console.error("新增食譜失敗:", m);
    return NextResponse.json({ error: `新增失敗: ${m}` }, { status: 400 });
  }
}
