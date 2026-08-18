import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Home-Cooked Food in Kondapur | RuchiRush Subscriptions",
  description: "Find trusted home kitchens in Kondapur, Hyderabad. Wholesome lunch and dinner subscriptions near Botanical Garden Road, Raghavendra Colony and Whitefields.",
  alternates: {
    canonical: "https://www.ruchirush.com/home-food-kondapur",
  },
};

export default function KondapurPage() {
  return (
    <ServiceAreaPage 
      areaName="Kondapur"
      title="Fresh Home-Cooked Food Delivery in Kondapur"
      metaDescription="Order nutritious, clean home cooking from verified cooks in Kondapur. Try a single meal before subscribing to weekly or monthly lunch and dinner plans."
      landmarks={[
        "Botanical Garden Road", 
        "Raghavendra Colony", 
        "Whitefields", 
        "Kothaguda Junction", 
        "Chirec Avenue",
        "Silpa Park"
      ]}
      cuisineHighlight="North & South Indian Home Meals, Fresh Rotis & Paneer Curries"
      localStory="Positioned conveniently between Hi-Tech City and Gachibowli, Kondapur is one of Hyderabad's most active residential neighborhoods. Professionals and families in Kondapur value wholesome nutrition and balanced meals. RuchiRush brings authentic home kitchens right to Kondapur apartments and gated communities."
      sampleKitchens={[
        {
          name: "Swathi's Sattvik Rasoi",
          specialty: "North Indian Homestyle Thali",
          bio: "Pure vegetarian homestyle rotis, seasonal sabzis, and light dals cooked with minimal spices and no soda.",
          trialPrice: "₹120 / meal",
          weeklyPrice: "₹700 / week"
        },
        {
          name: "Sita's Rayalaseema Kitchen",
          specialty: "Traditional Ragi Sangati & Curries",
          bio: "Wholesome regional classics made with organic oils, fresh produce, and heritage village techniques.",
          trialPrice: "₹135 / meal",
          weeklyPrice: "₹780 / week"
        }
      ]}
      faqs={[
        {
          q: "Do you deliver to gated communities in Kondapur?",
          a: "Yes. Grouped neighborhood delivery routes cover major apartment complexes and communities throughout Kondapur and Botanical Garden Road."
        },
        {
          q: "What packaging is used for deliveries in Kondapur?",
          a: "All meals are packed in food-grade, leak-proof, and insulated containers to ensure they arrive hot and fresh."
        },
        {
          q: "How do I switch kitchens in Kondapur if I want variety?",
          a: "You can try single meals from different kitchens and renew or switch your weekly plan anytime between billing cycles."
        }
      ]}
    />
  );
}
