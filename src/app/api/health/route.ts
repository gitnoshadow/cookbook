import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (e: unknown) {
    const detail = e instanceof Error ? JSON.stringify(e, Object.getOwnPropertyNames(e)) : String(e);
    console.error("資料庫連線失敗:", detail);
    return NextResponse.json({ status: "error", database: "disconnected", error: detail }, { status: 500 });
  }
}
