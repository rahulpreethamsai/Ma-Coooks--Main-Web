import "./globals.css";

export const metadata = {
  title: "RuchiRush | Home Chefs & Homemade Food Platform in Hyderabad",
  description:
    "RuchiRush connects verified home chefs, especially women-led home kitchens, with customers looking for authentic homemade food in Hyderabad. Connecting verified home chefs and local food lovers through trust, homemade food, and community. Real food made by real people.",

  verification: {
    google: "w7LKjIBGepncp8z90O3vQAcAVPG98hpjB5Qz8lZ1e2c",
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1786990240/cld-sample.png",
    shortcut:
      "https://res.cloudinary.com/dt79nhjkc/image/upload/v1786990240/cld-sample.png",
    apple: "https://res.cloudinary.com/dt79nhjkc/image/upload/v1786990240/cld-sample.png",
  },
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
        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodDeliveryService",
              "name": "RuchiRush",
              "image": "https://res.cloudinary.com/dt79nhjkc/image/upload/v1786990240/cld-sample.png",
              "@id": "https://ruchirush.netlify.app/#organization",
              "url": "https://ruchirush.netlify.app",
              "telephone": "+919908574741",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "DLF Cyber City, Gachibowli",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500032",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.4483,
                "longitude": 78.3741
              },
              "areaServed": [
                { "@type": "City", "name": "Hyderabad" },
                { "@type": "AdministrativeArea", "name": "Gachibowli" },
                { "@type": "AdministrativeArea", "name": "Madhapur" },
                { "@type": "AdministrativeArea", "name": "Kondapur" },
                { "@type": "AdministrativeArea", "name": "Kukatpally" },
                { "@type": "AdministrativeArea", "name": "Jubilee Hills" }
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
