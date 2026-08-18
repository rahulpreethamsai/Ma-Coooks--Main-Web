import "./globals.css";

export const metadata = {
  title: "RuchiRush | Home-Cooked Meal Subscriptions in Hyderabad",
  description: "Discover trusted home kitchens in Hyderabad. Try homemade lunch or dinner and subscribe to weekly or monthly meal plans in Gachibowli, Kondapur, Madhapur and Hi-Tech City.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1778754150/cld-sample.png",
    shortcut: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1778754150/cld-sample.png",
    apple: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1778754150/cld-sample.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* Preconnect hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Italiana&family=Nixie+One&family=Solway:wght@300;400;500;700;800&family=Special+Elite&display=swap" 
          rel="stylesheet"
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodDeliveryService",
              "name": "RuchiRush",
              "image": "https://res.cloudinary.com/dt79nhjkc/image/upload/v1780987405/samples/woman-on-a-football-field.png",
              "@id": "https://ruchirush.netlify.app",
              "url": "https://ruchirush.netlify.app",
              "telephone": "+919999999999",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gachibowli Street No 2",
                "addressLocality": "Hyderabad",
                "addressRegion": "TS",
                "postalCode": "500032",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.4483,
                "longitude": 78.3741
              },
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "Hyderabad" },
                { "@type": "AdministrativeArea", "name": "Gachibowli" },
                { "@type": "AdministrativeArea", "name": "Madhapur" },
                { "@type": "AdministrativeArea", "name": "Jubilee Hills" },
                { "@type": "AdministrativeArea", "name": "Kukatpally" },
                { "@type": "AdministrativeArea", "name": "Kondapur" }
              ],
            }) 
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
