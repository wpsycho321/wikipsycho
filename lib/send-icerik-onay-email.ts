import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM ?? "onay@wikipsycho.org.tr";

export type SendIcerikOnayParams = {
  icerikTuru: string;
  baslik: string;
  sanityId: string;
  gonderecelikKisi: string;
  birimLideriMail: string;
};

export async function sendIcerikOnayEmail(params: SendIcerikOnayParams) {
  const { icerikTuru, baslik, sanityId, gonderecelikKisi, birimLideriMail } =
    params;

  const studioLink = `https://wikipsycho-hst.vercel.app/studio/structure/${icerikTuru};${sanityId}`;

  const html = `
    <h2>Onay Bekleyen İçerik</h2>
    <p><strong>İçerik türü:</strong> ${icerikTuru}</p>
    <p><strong>Başlık:</strong> ${baslik}</p>
    <p><strong>Gönderen:</strong> ${gonderecelikKisi}</p>
    <p><strong>Sanity Studio linki:</strong> <a href="${studioLink}">${studioLink}</a></p>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: birimLideriMail,
    subject: `[WikiPsycho] Onay Bekleyen İçerik: ${baslik}`,
    html,
  });
}
