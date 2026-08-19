import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Fresh Homemade Food Delivery in Gachibowli, Hyderabad | Ruchi Rush",
  description: "Order authentic, wholesome meals made by verified home chefs near Gachibowli. Fast delivery to DLF Cyber City, IIIT, and surrounding neighborhoods."
};

export default function Page() {
  return (
    <ServiceAreaPage 
      areaName="Gachibowli"
      title="Fresh Homemade Food Delivery in Gachibowli, Hyderabad"
      metaDescription="Order authentic, wholesome meals made by verified home chefs near Gachibowli. Fast delivery to DLF Cyber City, IIIT, and surrounding neighborhoods."
      landmarks={["DLF Cyber City", "IIIT Hyderabad", "Gachibowli Stadium", "Wipro Circle", "Financial District"]}
      cuisineHighlight="Andhra Special Veg Thali, Spicy Parotta + Egg Curry"
      localStory="Nestled in the heart of Hyderabad's financial and technology corridor, Gachibowli is home to thousands of busy IT professionals, students, and young families. With hectic work schedules, finding the time to cook nutritious, clean food is a daily struggle. RuchiRush connects you with vetted, local home chefs who prepare traditional meals in small batches, ensuring you get wholesome, healthy nutrition without the restaurant grease."
      chefIds={["chef_1"]}
    />
  );
}
