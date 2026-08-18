import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Home-Cooked Food in Madhapur | RuchiRush Subscriptions",
  description: "Authentic homemade meals from verified local kitchens in Madhapur, Hyderabad. Subscribe to weekly lunch and dinner plans near Cyber Towers, Image Gardens and Mindspace.",
  alternates: {
    canonical: "https://www.ruchirush.com/home-food-madhapur",
  },
};

export default function MadhapurPage() {
  return (
    <ServiceAreaPage 
      areaName="Madhapur"
      title="Authentic Home-Cooked Food Subscriptions in Madhapur"
      metaDescription="Wholesome, home-style lunches and dinners prepared by verified local cooks in Madhapur. Order a single trial meal or subscribe weekly."
      landmarks={[
        "Cyber Towers", 
        "Image Gardens Road", 
        "Madhapur Metro Station", 
        "Durgam Cheruvu", 
        "Ayyappa Society",
        "Kavuri Hills"
      ]}
      cuisineHighlight="Light Comfort Food, Fresh Phulkas, Simmered Dals & Sambar"
      localStory="As the energetic center of Hyderabad's technology corridor, Madhapur is surrounded by workspaces, co-living spaces, and PG hostels. Finding clean, preservative-free home food in Madhapur used to mean relying on greasy takeout. RuchiRush bridges the gap by connecting individuals directly with verified home kitchens in the neighborhood."
      sampleKitchens={[
        {
          name: "Anasuya's Home Kitchen",
          specialty: "Andhra Homestyle Lunch Boxes",
          bio: "Nutritious daily office lunch boxes with fresh phulkas, dal tadka, seasonal vegetable fry, and curd.",
          trialPrice: "₹125 / meal",
          weeklyPrice: "₹720 / week"
        },
        {
          name: "Bhavani's Kitchen",
          specialty: "North Indian Roti & Paneer Specials",
          bio: "Pure home cooking prepared using filtered water, cold-pressed oils, and farm-fresh ingredients.",
          trialPrice: "₹130 / meal",
          weeklyPrice: "₹750 / week"
        }
      ]}
      faqs={[
        {
          q: "Can I receive home food delivery directly to my office in Madhapur?",
          a: "Yes. Many professionals in Madhapur and Cyber Towers subscribe to our 12:00–1:30 PM weekday lunch slot for hot office deliveries."
        },
        {
          q: "Are the kitchen hygiene standards verified in Madhapur?",
          a: "Every home kitchen completes identity verification, FSSAI registration compliance, and kitchen cleanliness inspections."
        },
        {
          q: "What if I miss my lunch slot due to a meeting?",
          a: "Meals are packed in temperature-insulated containers to retain freshness and warmth."
        }
      ]}
    />
  );
}
