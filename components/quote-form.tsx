'use client'

import { useActionState } from 'react'
import { sendQuote, type QuoteState } from '@/app/actions/sendQuote'

const initialState: QuoteState = { status: 'idle', message: '' }

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(sendQuote, initialState)
  return (
    <form action={formAction} className="space-y-5" aria-describedby="quote-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Név<input name="name" required maxLength={120} placeholder="Az Ön neve" /></label>
        <label className="field-label">Telefon vagy e-mail<input name="contact" required maxLength={160} placeholder="Elérhetősége" /></label>
      </div>
      <label className="field-label">Miben segíthetünk?<textarea name="message" required maxLength={1200} rows={5} placeholder="Írja le röviden, mire van szüksége." /></label>
      <p id="quote-note" className="text-sm text-slate-500">Az üzenet elküldése után telefonon vagy e-mailben keressük.</p>
      <button className="button-primary w-full sm:w-auto" disabled={pending}>{pending ? 'Küldés...' : 'Ajánlatot kérek'}</button>
      {state.message && <p role="status" className={state.status === 'success' ? 'text-green-700' : 'text-red-700'}>{state.message}</p>}
    </form>
  )
}
