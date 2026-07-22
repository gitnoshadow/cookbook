import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  if (!q) {
    return NextResponse.json({ seasonings: [], recipes: [] });
  }
  const [seasonings, recipes] = await Promise.all([
    prisma.seasoningPowder.findMany({
      where: { name: { contains: q } },
      include: { _count: { select: { recipes: true } } },
    }),
    prisma.recipe.findMany({
      where: { name: { contains: q } },
      include: {
        seasoningPowders: {
          include: { seasoningPowder: true },
        },
      },
    }),
  ]);
  return NextResponse.json({ seasonings, recipes });
}
