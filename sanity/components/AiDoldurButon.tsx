"use client";

import React, { useState } from "react";
import { useDocumentOperation } from "sanity";
import { Box, Button, Card, Flex, Stack, Text, TextArea } from "@sanity/ui";

type Tur = "yazi" | "proje" | "eyayin" | "etkinlik";

type AiResponse = {
  baslik?: string;
  altBaslik?: string;
  ozet?: string;
  kategori?: string;
  metaBaslik?: string;
  metaAciklama?: string;
  anahtarKelimeler?: string[];
};

const SUPPORTED_TYPES: Tur[] = ["yazi", "proje", "eyayin", "etkinlik"];

export function AiDoldurAction(props: {
  id: string;
  type: string;
  draft?: Record<string, unknown> | null;
  published?: Record<string, unknown> | null;
  onComplete?: () => void;
}) {
  const { id, type } = props;
  const { patch } = useDocumentOperation(id, type);

  const [isOpen, setOpen] = useState(false);
  const [hamIcerik, setHamIcerik] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!SUPPORTED_TYPES.includes(type as Tur)) return null;

  const handleOpen = () => {
    setHamIcerik("");
    setError(null);
    setSuccess(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDoldur = async () => {
    if (!hamIcerik.trim()) {
      setError("Ham içerik boş olamaz.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch(`${base}/api/ai-doldur`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hamIcerik: hamIcerik.trim(),
          tur: type as Tur,
        }),
      });
      const data = (await res.json()) as AiResponse | { error?: string };
      if (!res.ok) {
        setError((data as { error?: string }).error ?? "İstek başarısız.");
        setLoading(false);
        return;
      }
      const parsed = data as AiResponse;

      const ops: { set: Record<string, unknown> }[] = [];
      if (parsed.baslik != null) ops.push({ set: { baslik: parsed.baslik } });
      if (parsed.altBaslik != null)
        ops.push({ set: { altBaslik: parsed.altBaslik } });
      const ozetField = type === "proje" || type === "etkinlik" ? "aciklama" : "ozet";
      if (parsed.ozet != null) ops.push({ set: { [ozetField]: parsed.ozet } });
      if (parsed.kategori != null)
        ops.push({ set: { kategori: parsed.kategori } });
      if (parsed.metaBaslik != null)
        ops.push({ set: { metaBaslik: parsed.metaBaslik } });
      if (parsed.metaAciklama != null)
        ops.push({ set: { metaAciklama: parsed.metaAciklama } });
      if (
        Array.isArray(parsed.anahtarKelimeler) &&
        parsed.anahtarKelimeler.length > 0
      )
        ops.push({ set: { anahtarKelimeler: parsed.anahtarKelimeler } });

      if (ops.length > 0) {
        patch.execute(
          ops.map((o) => ({ set: o.set } as { set: Record<string, unknown> }))
        );
      }
      setSuccess(true);
      props.onComplete?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return {
    label: "🤖 AI ile Doldur",
    onHandle: handleOpen,
    dialog: isOpen && {
      type: "dialog" as const,
      onClose: handleClose,
      header: "AI ile Alanları Doldur",
      content: (
        <Box padding={4}>
          <Stack space={4}>
            <Text size={1} muted>
              Ham içeriği (makale metni, notlar vb.) yapıştırın. AI başlık,
              özet, kategori ve SEO alanlarını otomatik dolduracak.
            </Text>
            <TextArea
              placeholder="İçeriği buraya yapıştırın..."
              value={hamIcerik}
              onChange={(e) => setHamIcerik(e.currentTarget.value)}
              rows={8}
            />
            {error && (
              <Card padding={2} tone="critical">
                <Text size={1}>{error}</Text>
              </Card>
            )}
            {success && (
              <Card padding={2} tone="positive">
                <Text size={1}>Alanlar başarıyla dolduruldu.</Text>
              </Card>
            )}
            <Flex gap={2} justify="flex-end">
              <Button text="İptal" tone="default" onClick={handleClose} />
              <Button
                text={loading ? "İşleniyor…" : "Doldur"}
                tone="primary"
                disabled={loading}
                onClick={handleDoldur}
              />
            </Flex>
          </Stack>
        </Box>
      ),
    },
  };
}
