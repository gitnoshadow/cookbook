import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(id) },
    include: {
      seasoningPowders: {
        include: { seasoningPowder: true },
      },
    },
  });
  if (!recipe) {
    return NextResponse.json({ error: "找不到此食譜" }, { status: 404 });
  }
  return NextResponse.json(recipe);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    await prisma.recipeSeasoningPowder.deleteMany({ where: { recipeId: Number(id) } });
    const recipe = await prisma.recipe.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description ?? null,
        photoUrl: body.photoUrl ?? null,
        ingredients: body.ingredients ? JSON.stringify(body.ingredients) : null,
        steps: body.steps ? JSON.stringify(body.steps) : null,
        cookingTime: body.cookingTime ? Number(body.cookingTime) : null,
        difficulty: body.difficulty ?? null,
        seasoningPowders: {
          create: (body.seasoningPowderIds as number[] || []).map((sid: number) => ({
            seasoningPowderId: sid,
          })),
        },
      },
      include: {
        seasoningPowders: {
          include: { seasoningPowder: true },
        },
      },
    });
    return NextResponse.json(recipe);
  } catch (e: unknown) {
    const m = e instanceof Error ? e.message : String(e);
    console.error("更新食譜失敗:", m);
    return NextResponse.json({ error: `更新失敗: ${m}` }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.recipe.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const m = e instanceof Error ? e.message : String(e);
    console.error("刪除食譜失敗:", m);
    return NextResponse.json({ error: `刪除失敗: ${m}` }, { status: 400 });
  }
}
