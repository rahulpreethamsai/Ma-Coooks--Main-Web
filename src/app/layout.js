import "./globals.css";

export const metadata = {
  title: "Ruchi Rush — Premium Home Cooked Food Connection",
  description: "Connecting verified home chefs and local food lovers through trust, homemade food, and community. Real food made by real people.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1778754150/cld-sample.png",
    shortcut: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1778754150/cld-sample.png",
    apple: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1778754150/cld-sample.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth overflow-x-hidden">
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
              "@id": "https://helloruchirush.netlify.app",
              "url": "https://helloruchirush.netlify.app",
              "telephone": "+919908574741",
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
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "ratingCount": "537"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Rahul Sai" },
                  "datePublished": "2026-05-28",
                  "reviewBody": "The spicy parotta and egg curry from Priya's Godavari Kitchen was amazing. Tasted exactly like the meals my grandmother cooks back home in Godavari.",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5" }
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Sneha Reddy" },
                  "datePublished": "2026-06-02",
                  "reviewBody": "Lakshmi's millet breakfasts was a lifesaver. Extremely light, fresh, and delivered hot daily.",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5" }
                }
              ]
            }) 
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
