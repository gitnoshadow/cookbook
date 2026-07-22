import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const recipe = await prisma.recipe.update({
      where: { id: Number(id) },
      data: { isFavorited: body.isFavorited },
    });
    return NextResponse.json({ id: recipe.id, isFavorited: recipe.isFavorited });
  } catch (e: unknown) {
    const m = e instanceof Error ? e.message : String(e);
    console.error("切換收藏失敗:", m);
    return NextResponse.json({ error: `切換收藏失敗: ${m}` }, { status: 400 });
  }
}
