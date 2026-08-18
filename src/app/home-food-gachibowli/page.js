import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Home-Cooked Food in Gachibowli | RuchiRush Subscriptions",
  description: "Discover verified home kitchens in Gachibowli, Hyderabad. Try single trial meals and subscribe to weekly lunch and dinner plans near DLF, IIIT & Financial District.",
  alternates: {
    canonical: "https://www.ruchirush.com/home-food-gachibowli",
  },
};

export default function GachibowliPage() {
  return (
    <ServiceAreaPage 
      areaName="Gachibowli"
      title="Home-Cooked Meal Subscriptions in Gachibowli"
      metaDescription="Connect with verified neighborhood home cooks in Gachibowli. Try one meal first, then subscribe to daily lunch or dinner plans delivered fresh."
      landmarks={[
        "DLF Cyber City", 
        "IIIT Hyderabad", 
        "Gachibowli Stadium", 
        "Financial District", 
        "Wipro Circle",
        "Telecom Nagar"
      ]}
      cuisineHighlight="Traditional Andhra Thali, Hot Phulkas & Slow-Simmered Dal"
      localStory="Located in Hyderabad's premier IT and financial belt, Gachibowli is home to thousands of software professionals, students, and young families. With long work hours and busy schedules, dining on heavy restaurant food every day is unsustainable. RuchiRush connects Gachibowli residents with vetted local home kitchens that prepare fresh, balanced meals in small batches."
      sampleKitchens={[
        {
          name: "Lakshmi's Home Kitchen",
          specialty: "Telugu Veg Thali & Millet Specials",
          bio: "Homemade daily meals cooked in small batches with low oil, fresh vegetables, and stone-ground spices.",
          trialPrice: "₹120 / meal",
          weeklyPrice: "₹700 / week"
        },
        {
          name: "Priya's Godavari Kitchen",
          specialty: "Godavari Curries & Soft Phulkas",
          bio: "Authentic coastal Andhra flavors prepared with traditional family recipes and hygienic home standards.",
          trialPrice: "₹140 / meal",
          weeklyPrice: "₹800 / week"
        }
      ]}
      faqs={[
        {
          q: "How does home food delivery work in Gachibowli?",
          a: "Local home cooks prepare meals in defined batches. Couriers pick up meals during designated lunch (12:00–2:00 PM) or dinner (7:30–9:30 PM) slots for fast, warm delivery."
        },
        {
          q: "Can I try a single meal in Gachibowli before subscribing?",
          a: "Yes! You can order a single trial meal from any listed Gachibowli kitchen. Subscribe weekly only if you love the taste and portion size."
        },
        {
          q: "Can I pause delivery if I'm working late or travelling?",
          a: "Yes. Weekly and monthly meal plans in Gachibowli offer flexible pause and skip options with 12 hours advance notice."
        }
      ]}
    />
  );
}
