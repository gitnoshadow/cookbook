import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const seasonings = await prisma.seasoningPowder.findMany({
    where: q ? { name: { contains: q } } : undefined,
    include: { _count: { select: { recipes: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(seasonings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const seasoning = await prisma.seasoningPowder.create({
      data: {
        name: body.name,
        description: body.description || null,
        imageUrl: body.imageUrl || null,
      },
    });
    return NextResponse.json(seasoning, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      const detail = JSON.stringify(e, Object.getOwnPropertyNames(e));
      console.error("新增調味粉失敗:", e.message, "| detail:", detail);
    } else {
      console.error("新增調味粉失敗(非 Error):", e);
    }
    const message = e instanceof Error ? e.message : String(e);
    if (message.includes("Unique constraint") || message.includes("UNIQUE")) {
      return NextResponse.json({ error: "此調味粉名稱已存在" }, { status: 409 });
    }
    return NextResponse.json({ error: `新增失敗: ${message}` }, { status: 400 });
  }
}
