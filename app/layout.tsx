import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = { metadataBase:new URL(SITE_URL), title:'Gumiszerviz és Autójavítás Ózd | Révész-Car', description:'Gumiszerviz és autójavítás Ózdon: gumicsere, centírozás, gumijavítás, új és használt gumiabroncsok, olajcsere, futóműjavítás. Hívjon: +36 20 569 4491', openGraph:{title:'Révész-Car | Gumiszerviz és autójavítás Ózdon',description:'Gumicsere, centírozás, gumijavítás, új és használt gumiabroncsok és autójavítás Ózdon.',locale:'hu_HU',type:'website',url:SITE_URL}, twitter:{card:'summary_large_image'} }
export const viewport: Viewport = { colorScheme:'light', themeColor:'#0C1634' }
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="hu"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics/>}</body></html> }
