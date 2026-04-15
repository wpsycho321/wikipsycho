import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "basvuru"
      ),
      S.divider(),
      S.listItem()
        .title("Başvurular")
        .icon(() => "📋")
        .child(
          S.documentTypeList("ilan")
            .title("İlanlar")
            .child((ilanId) =>
              S.documentList()
                .title("Başvurular")
                .filter('_type == "basvuru" && ilan._ref == $ilanId')
                .params({ ilanId })
                .child((basvuruId) =>
                  S.document()
                    .documentId(basvuruId)
                    .schemaType("basvuru")
                )
            )
        ),
    ]);
