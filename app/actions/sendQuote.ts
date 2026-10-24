'use server'

import { Resend } from 'resend'

export type QuoteState = { status: 'idle' | 'success' | 'error'; message: string }
const errorMessage = 'Hiba történt a küldés során. Kérjük, hívjon minket: +36 20 569 4491'
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character] ?? character))

export async function sendQuote(_previousState: QuoteState, formData: FormData): Promise<QuoteState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const service = String(formData.get('service') ?? '').trim()
  const brand = String(formData.get('brand') ?? '').trim()
  const type = String(formData.get('type') ?? '').trim()
  const vin = String(formData.get('vin') ?? '').trim()
  const note = String(formData.get('note') ?? '').trim()
  if (!name || !phone || !service || !brand || !type) return { status: 'error', message: errorMessage }
  if ([name, phone, email, service, brand, type, vin, note].some(value => value.length > 1200)) return { status: 'error', message: errorMessage }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const fields = [['Név', name], ['Telefonszám', phone], ['Email cím', email], ['Szolgáltatás', service], ['Márka', brand], ['Típus', type], ['Alvázszám', vin], ['Megjegyzés', note]]
  const rows = fields.map(([label, value]) => `<tr><td style="padding:10px;border-bottom:1px solid #dbe3ef;font-weight:700">${label}</td><td style="padding:10px;border-bottom:1px solid #dbe3ef">${escapeHtml(value || '-')}</td></tr>`).join('')
  const { error } = await resend.emails.send({
    from: 'ajanlat@ttamasmarketing.com',
    to: 'tokolitamas7@gmail.com', // TEST MODE, change to muhelymunk08@freemail.hu when going live.
    subject: `Új ajánlatkérés: ${service} | ${name}`,
    html: `<div style="font-family:Arial,sans-serif;color:#0c1634"><div style="background:#0c1634;color:white;padding:22px"><h1 style="margin:0">Új ajánlatkérés</h1></div><table style="width:100%;border-collapse:collapse;margin-top:18px">${rows}</table><footer style="margin-top:22px;padding:18px;background:#f2f5f9">Révész-Car<br>3600 Ózd, Vasvár út 117.<br>+36 20 569 4491</footer></div>`
  })
  return error ? { status: 'error', message: errorMessage } : { status: 'success', message: 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.' }
}
