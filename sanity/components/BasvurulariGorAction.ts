"use client";

import { useClient } from "sanity";
import { apiVersion } from "../env";

type BasvuruDoc = {
  ilan?: { _ref?: string };
};

export function BasvurulariGorAction(props: {
  id: string;
  type: string;
  draft?: Record<string, unknown> | null;
  published?: Record<string, unknown> | null;
}) {
  const client = useClient({ apiVersion });
  const { type } = props;

  if (type !== "basvuru") return null;

  const doc = (props.draft ?? props.published) as BasvuruDoc | undefined;
  const ilanRef = doc?.ilan?._ref;
  if (!ilanRef) return null;

  return {
    label: "Tabloyu Gör",
    onHandle: async () => {
      const ilan = await client.fetch<{ slug?: { current?: string } } | null>(
        `*[_id == $id][0]{ slug }`,
        { id: ilanRef }
      );
      const slug = ilan?.slug?.current;
      if (slug) {
        window.location.href = `https://wikipsycho.org.tr/ilanlar/${slug}/basvurular?token=wpadmin2024`;
      }
    },
  };
}
