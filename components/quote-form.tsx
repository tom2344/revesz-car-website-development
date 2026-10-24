'use client'

import { useActionState } from 'react'
import { sendQuote, type QuoteState } from '@/app/actions/sendQuote'

const initialState: QuoteState = { status: 'idle', message: '' }
const services = ['Gumiszerelés és kerékcsere','Centírozás','Gumijavítás','Új vagy használt gumiabroncs','Gumihotel','Olajcsere','Futóművel kapcsolatos javítás','Autódiagnosztika','Általános autójavítás','Egyéb']

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(sendQuote, initialState)
  return <form action={formAction} className="quote-form" aria-describedby="quote-note">
    <div><h2>Ajánlatkérés</h2><p id="quote-note" className="section-lead">Töltse ki az űrlapot, hamarosan felvesszük Önnel a kapcsolatot.</p></div>
    <label className="field-label">Név *<input name="name" required maxLength={120} /></label>
    <label className="field-label">Telefonszám *<input type="tel" name="phone" required maxLength={40} /></label>
    <label className="field-label">Email cím (opcionális)<input type="email" name="email" maxLength={160} /></label>
    <label className="field-label">Szolgáltatás *<select name="service" required defaultValue=""><option value="" disabled>Válasszon szolgáltatást...</option>{services.map(service => <option key={service}>{service}</option>)}</select></label>
    <div className="quote-fields-two"><label className="field-label"><span>Márka <b aria-hidden="true">*</b></span><input name="brand" required placeholder="pl. Opel" maxLength={80} /></label><label className="field-label"><span>Típus <b aria-hidden="true">*</b></span><input name="type" required placeholder="pl. Astra" maxLength={80} /></label></div>
    <label className="field-label">Alvázszám (opcionális)<input name="vin" maxLength={80} /></label>
    <label className="field-label">Megjegyzés (opcionális)<textarea name="note" maxLength={1200} rows={5} /></label>
    <button className="button-primary" disabled={pending}>{pending ? 'Küldés...' : 'Ajánlatot kérek'}</button>
    {state.message && <p role="status" className={state.status === 'success' ? 'text-green-700' : 'text-red-700'}>{state.message}</p>}
  </form>
}
