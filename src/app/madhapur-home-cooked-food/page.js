import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Authentic Home Cooked Food in Madhapur, Hyderabad | RuchiRush",
  description: "Get fresh, home-cooked food delivered straight to your home or office in Madhapur. Order from verified home chefs near Cyber Towers and Hitec City."
};

export default function Page() {
  return (
    <ServiceAreaPage 
      areaName="Madhapur"
      title="Authentic Home Cooked Food in Madhapur, Hyderabad"
      metaDescription="Get fresh, home-cooked food delivered straight to your home or office in Madhapur. Order from verified home chefs near Cyber Towers and Hitec City."
      landmarks={["Cyber Towers", "Hitec City", "Inorbit Mall Road", "Madhapur Police Station", "Madhapur Metro Station"]}
      cuisineHighlight="Paneer Butter Masala + Roti, Dal Makhani + Basmati Rice"
      localStory="As the bustling epicenter of Hitec City, Madhapur is always in motion. Busy workspaces, paying guest accommodations, and high-rise apartments line the streets, and finding healthy, comforting meals can be difficult. RuchiRush offers the ultimate alternative: freshly-rolled phulkas, slow-simmered home-style dals, and healthy North Indian paneer dishes prepared in verified home kitchens nearby. Made with minimal oil and no artificial coloring, it is the home food you deserve."
      chefIds={["chef_2"]}
    />
  );
}
