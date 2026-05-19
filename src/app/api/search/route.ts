import { NextResponse } from "next/server";
import { searchContent } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    const results = await searchContent(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("API search error:", error);
    return NextResponse.json(
      { error: "Gagal memproses pencarian" },
      { status: 500 }
    );
  }
}
