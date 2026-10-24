'use server'

export type QuoteState = { status: 'idle' | 'success' | 'error'; message: string }

export async function sendQuote(_previousState: QuoteState, formData: FormData): Promise<QuoteState> {
  const name = String(formData.get('name') ?? '').trim()
  const contact = String(formData.get('contact') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  if (!name || !contact || !message) return { status: 'error', message: 'Kérjük, töltse ki az összes mezőt.' }
  if (name.length > 120 || contact.length > 160 || message.length > 1200) return { status: 'error', message: 'Kérjük, rövidítse a megadott szöveget.' }
  return { status: 'success', message: 'Köszönjük az üzenetét. Hamarosan felvesszük Önnel a kapcsolatot.' }
}
