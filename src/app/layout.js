import "./globals.css";
import { Plus_Jakarta_Sans, Newsreader, Solway } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-h2',
  display: 'swap',
});

const solway = Solway({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-h1',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL("https://www.ruchirush.com"),
  title: "RuchiRush | Home-Cooked Meal Subscriptions in Hyderabad",
  description: "Discover trusted home kitchens in Hyderabad. Try homemade lunch or dinner and subscribe to weekly or monthly meal plans in Gachibowli, Kondapur, Madhapur and Hi-Tech City.",
  alternates: {
    canonical: "https://www.ruchirush.com",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "RuchiRush | Home-Cooked Meal Subscriptions in Hyderabad",
    description: "Discover trusted home kitchens in Hyderabad. Try homemade lunch or dinner and subscribe to weekly or monthly meal plans in Gachibowli, Kondapur, Madhapur and Hi-Tech City.",
    url: "https://www.ruchirush.com",
    siteName: "RuchiRush",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "RuchiRush - Home-cooked meal subscriptions in Hyderabad",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RuchiRush | Home-Cooked Meal Subscriptions in Hyderabad",
    description: "Discover trusted home kitchens in Hyderabad. Try homemade lunch or dinner and subscribe to weekly or monthly meal plans in Gachibowli, Kondapur, Madhapur and Hi-Tech City.",
    images: ["https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&h=630&fit=crop&q=80"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ruchirush.com/#organization",
        "name": "RuchiRush",
        "url": "https://www.ruchirush.com",
        "logo": "https://www.ruchirush.com/favicon.ico",
        "description": "Hyderabad-focused marketplace connecting customers with verified local home kitchens and weekly meal subscriptions.",
        "email": "hello@ruchirush.com",
        "telephone": "+919908574741",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gachibowli",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500032",
          "addressCountry": "IN"
        },
        "areaServed": [
          { "@type": "City", "name": "Hyderabad" },
          { "@type": "AdministrativeArea", "name": "Gachibowli" },
          { "@type": "AdministrativeArea", "name": "Kondapur" },
          { "@type": "AdministrativeArea", "name": "Madhapur" },
          { "@type": "AdministrativeArea", "name": "Hi-Tech City" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ruchirush.com/#website",
        "url": "https://www.ruchirush.com",
        "name": "RuchiRush",
        "description": "Home-cooked meal subscriptions from kitchens near you in Hyderabad.",
        "publisher": {
          "@id": "https://www.ruchirush.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.ruchirush.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is RuchiRush?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RuchiRush connects customers with local home kitchens offering wholesome home-cooked meals and recurring weekly or monthly meal plans in Hyderabad."
            }
          },
          {
            "@type": "Question",
            "name": "Is RuchiRush another Swiggy/Zomato?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. RuchiRush focuses specifically on nearby home kitchens, small-batch cooking, and regular home meal subscriptions instead of commercial restaurant delivery."
            }
          },
          {
            "@type": "Question",
            "name": "Can I try food before subscribing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Customers can order a single trial meal before committing to a weekly or monthly subscription."
            }
          },
          {
            "@type": "Question",
            "name": "Where are you launching in Hyderabad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are initially onboarding kitchens in Hyderabad's IT corridor, starting with Gachibowli, Kondapur, Madhapur, and Hi-Tech City."
            }
          },
          {
            "@type": "Question",
            "name": "Can I pause my subscription?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can easily pause or skip deliveries according to the flexible pause/skip rules of your selected meal plan."
            }
          },
          {
            "@type": "Question",
            "name": "How are kitchens verified?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home cooks undergo identity verification, kitchen hygiene audits, food-safety training, and FSSAI registration before their kitchen storefront is activated."
            }
          },
          {
            "@type": "Question",
            "name": "How do home chefs join?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Home chefs apply online, complete verification, configure their menu and pricing, set their daily cooking capacity, and receive repeat orders through RuchiRush."
            }
          },
          {
            "@type": "Question",
            "name": "Do you deliver everywhere in Hyderabad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not initially. RuchiRush is starting hyperlocally in the IT corridor (Gachibowli, Kondapur, Madhapur, Hi-Tech City) and expanding neighborhood by neighborhood."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`h-full scroll-smooth ${plusJakartaSans.variable} ${newsreader.variable} ${solway.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
