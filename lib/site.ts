export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://reveszcar.hu' // domain not registered or confirmed yet, replace later.
export const BRAND_NAME = 'Révész-Car'
export const ALT_NAME = 'Révész Autó-Gumiszerviz Ózd'
export const PHONE = '+36 20 569 4491'
export const PHONE_TEL = '+36205694491'
export const EMAIL = 'muhelymunk08@freemail.hu'
export const FACEBOOK_URL = 'https://www.facebook.com/p/R%C3%A9v%C3%A9sz-Aut%C3%B3-Gumiszerviz-%C3%93ZD-100038300203908/'
export const ADDRESS = '3600 Ózd, Vasvár út 117.' // Older listings show other addresses (25 főút, Sárli út 1.), confirm the address with the owner before launch.
export const HOURS = [
  ['Hétfő', '7:00-17:00'],
  ['Kedd-Péntek', '8:00-17:00'],
  ['Szombat', '8:00-13:00'],
  ['Vasárnap', 'zárva'],
] as const // The shop sign shows Monday 8:00, confirm Monday with the owner.
export const TIRE_NOTE = 'A gyakori méretek 13-17 col között elérhetők, 15C kisteher-abroncsokkal is. Más méretek 24 órán belül rendelhetők.' // Confirm with the owner, stock and lead times change.
