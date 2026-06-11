import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Authentic Home Food Service in Kukatpally, Hyderabad | Ruchi Rush",
  description: "Enjoy slow-cooked Hyderabadi chicken dum biryani and hot snacks prepared by certified home chefs in Kukatpally. Pure ghee, hand-ground spices."
};

export default function Page() {
  return (
    <ServiceAreaPage 
      areaName="Kukatpally"
      title="Authentic Home Food Service in Kukatpally, Hyderabad"
      metaDescription="Enjoy slow-cooked Hyderabadi chicken dum biryani and hot snacks prepared by certified home chefs in Kukatpally. Pure ghee, hand-ground spices."
      landmarks={["JNTU Road", "Forum Sujana Mall", "KPHB Colony", "Kukatpally Metro Station", "Rythu Bazar"]}
      cuisineHighlight="Hyderabadi Chicken Dum Biryani, Spicy Old City Chicken Fry"
      localStory="Kukatpally is one of Hyderabad's largest and most vibrant family neighborhoods. Families here cherish authentic recipes, especially rich, slow-dum biryanis and spicy snacks. Our verified home chefs prepare authentic dum biryani in traditional handis using pure ghee, fresh meat, and hand-ground spices. Experience the warmth of a kitchen that cares about the culture and taste of heritage cooking."
      chefIds={["chef_4"]}
    />
  );
}
