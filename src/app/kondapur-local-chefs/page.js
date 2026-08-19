import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Verified Local Home Chefs in Kondapur, Hyderabad | Ruchi Rush",
  description: "Discover vetted local home chefs delivering fresh, clean, and nutritious homemade meals to Kondapur. Order healthy food near Botanical Gardens."
};

export default function Page() {
  return (
    <ServiceAreaPage 
      areaName="Kondapur"
      title="Verified Local Home Chefs in Kondapur, Hyderabad"
      metaDescription="Discover vetted local home chefs delivering fresh, clean, and nutritious homemade meals to Kondapur. Order healthy food near Botanical Gardens."
      landmarks={["Botanical Gardens", "Kondapur RTO", "Chirec International School", "Kothaguda Junction", "Hafeezpet Road"]}
      cuisineHighlight="Andhra Veg Thali, Dal Makhani + Basmati Rice"
      localStory="Strategically located between Hitec City and Gachibowli, Kondapur has grown into a major hub for tech workers and families alike. With its close proximity to parks like the Botanical Gardens, the local community values healthy and active living. RuchiRush brings certified, fresh home cooking straight to Kondapur apartments. Our neighboring chefs provide a variety of North and South Indian home meals, prepared with home-level hygiene and organic oils."
      chefIds={["chef_1", "chef_2"]}
    />
  );
}
