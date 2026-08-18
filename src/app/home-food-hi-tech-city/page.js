import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Home-Cooked Food in Hi-Tech City | RuchiRush Subscriptions",
  description: "Discover verified home kitchens in Hi-Tech City, Hyderabad. Wholesome lunch and dinner meal subscriptions near Knowledge City, Inorbit Mall and Raheja Mindspace.",
  alternates: {
    canonical: "https://www.ruchirush.com/home-food-hi-tech-city",
  },
};

export default function HiTechCityPage() {
  return (
    <ServiceAreaPage 
      areaName="Hi-Tech City"
      title="Wholesome Home Food Delivery in Hi-Tech City"
      metaDescription="Make healthy, small-batch home cooking part of your work and home routine in Hi-Tech City, Hyderabad. Try one meal first, then subscribe."
      landmarks={[
        "Knowledge City", 
        "Raheja Mindspace IT Park", 
        "Inorbit Mall Zone", 
        "Hitec City Cyber Gateway", 
        "Vittal Rao Nagar",
        "Silparamam"
      ]}
      cuisineHighlight="Healthy Millet Meals, Soft Chapati Boxes & Protein-Rich Dals"
      localStory="Hi-Tech City is the technology beating heart of Hyderabad. Tens of thousands of engineers and analysts spend their weekdays in IT parks across Knowledge City and Mindspace. RuchiRush offers a dependable, healthy alternative to cafeteria oil and restaurant takeout by delivering genuine home-cooked meals from nearby local home kitchens."
      sampleKitchens={[
        {
          name: "Padma's Healthy Hearth",
          specialty: "Low-Calorie Veg & Millet Meals",
          bio: "Balanced, diabetic-friendly, and wholesome home meals made with cold-pressed sesame oil and unpolished grains.",
          trialPrice: "₹130 / meal",
          weeklyPrice: "₹750 / week"
        },
        {
          name: "Narayana's Telugu Rasoi",
          specialty: "Traditional Telugu Comfort Curries",
          bio: "Classic slow-cooked pappu, tomato rasam, and tender vegetable vepudu cooked with authentic home warmth.",
          trialPrice: "₹125 / meal",
          weeklyPrice: "₹720 / week"
        }
      ]}
      faqs={[
        {
          q: "How does RuchiRush deliver to large tech parks in Hi-Tech City?",
          a: "Deliveries are coordinated directly to building reception or designated pickup bays during standard lunch windows."
        },
        {
          q: "Can I choose between Veg and Non-Veg days on my subscription?",
          a: "Yes. Weekly plans allow you to customize your preferences or choose hybrid meal schedules depending on the kitchen's menu."
        },
        {
          q: "How do I subscribe for my team or colleagues in Hi-Tech City?",
          a: "You can combine orders from the same kitchen to enjoy group delivery schedules directly to your workspace."
        }
      ]}
    />
  );
}
