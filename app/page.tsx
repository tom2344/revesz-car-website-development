import { About, Contact, Footer, Gallery, Header, Hero, QuoteSection, Services, Tires } from '@/components/site-sections'
import { ALT_NAME, ADDRESS, BRAND_NAME, EMAIL, FACEBOOK_URL, PHONE_TEL, SITE_URL } from '@/lib/site'

export default function Page() {
  const schema = { '@context':'https://schema.org', '@type':['AutoRepair','TireShop'], name:BRAND_NAME, alternateName:ALT_NAME, description:'Gumiszerviz és autójavítás Ózdon.', url:SITE_URL, telephone:PHONE_TEL, email:EMAIL, address:{'@type':'PostalAddress',streetAddress:'Vasvár út 117.',addressLocality:'Ózd',postalCode:'3600',addressCountry:'HU'}, openingHours:['Mo 07:00-17:00','Tu-Fr 08:00-17:00','Sa 08:00-13:00'], sameAs:[FACEBOOK_URL] }
  return <><a className="skip-link" href="#tartalom">Ugrás a tartalomhoz</a><Header/><main id="tartalom"><Hero/><Tires/><Services/><Gallery/><QuoteSection/><About/><Contact/></main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>
}
