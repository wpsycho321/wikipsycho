import { NextResponse } from "next/server";
import { clientNoCache } from "@/lib/sanity";
import { ekipGruplariQuery } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const gruplar = await clientNoCache.fetch(ekipGruplariQuery);
    return NextResponse.json(gruplar, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
