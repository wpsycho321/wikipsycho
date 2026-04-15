import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export async function POST(req: NextRequest) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "SANITY_API_TOKEN tanımlı değil" },
      { status: 500 }
    );
  }

  const client = createClient({
    projectId: projectId!,
    dataset: dataset!,
    apiVersion,
    token,
    useCdn: false,
  });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await client.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({ url: asset.url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Yükleme hatası" },
      { status: 500 }
    );
  }
}
