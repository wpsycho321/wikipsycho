import { type SchemaTypeDefinition } from "sanity";
import yazi from "./yazi";
import yazar from "./yazar";
import proje from "./proje";
import eyayin from "./eyayin";
import ekipUyesi from "./ekipUyesi";
import birim from "./birim";
import video from "./video";
import podcast from "./podcast";
import etkinlik from "./etkinlik";
import linkKutusu from "./linkKutusu";
import duyuru from "./duyuru";
import ayinTemasi from "./ayinTemasi";
import ilan from "./ilan";
import basvuru from "./basvuru";
import projeRaporu from "./projeRaporu";
import haber from "./haber";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    yazi,
    yazar,
    proje,
    eyayin,
    ekipUyesi,
    birim,
    video,
    podcast,
    etkinlik,
    linkKutusu,
    duyuru,
    ayinTemasi,
    ilan,
    basvuru,
    projeRaporu,
    haber,
  ],
};

