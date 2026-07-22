import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const seasoning = await prisma.seasoningPowder.findUnique({
    where: { id: Number(id) },
    include: {
      recipes: {
        include: { recipe: true },
      },
    },
  });
  if (!seasoning) {
    return NextResponse.json({ error: "找不到此調味粉" }, { status: 404 });
  }
  return NextResponse.json(seasoning);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const seasoning = await prisma.seasoningPowder.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description ?? null,
        imageUrl: body.imageUrl ?? null,
      },
    });
    return NextResponse.json(seasoning);
  } catch (e: unknown) {
    const m = e instanceof Error ? e.message : String(e);
    console.error("更新調味粉失敗:", m);
    return NextResponse.json({ error: `更新失敗: ${m}` }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.seasoningPowder.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const m = e instanceof Error ? e.message : String(e);
    console.error("刪除調味粉失敗:", m);
    return NextResponse.json({ error: `刪除失敗: ${m}` }, { status: 400 });
  }
}
