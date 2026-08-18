import ServiceAreaPage from '@/components/ServiceAreaPage';

export const metadata = {
  title: "Premium Home Chef Delivery in Jubilee Hills, Hyderabad | RuchiRush",
  description: "Experience premium home-style breakfasts and healthy meals cooked by verified chefs in Jubilee Hills. Order freshly-ground pesarattu and idli."
};

export default function Page() {
  return (
    <ServiceAreaPage 
      areaName="Jubilee Hills"
      title="Premium Home Chef Delivery in Jubilee Hills, Hyderabad"
      metaDescription="Experience premium home-style breakfasts and healthy meals cooked by verified chefs in Jubilee Hills. Order freshly-ground pesarattu and idli."
      landmarks={["Road No 36", "Peddamma Temple", "Jubilee Hills Checkpost", "Filmnagar", "KBR Park"]}
      cuisineHighlight="Andhra Pesarattu Upma, Guntur Karam Podi Idli"
      localStory="Known for its beautiful residential estates and commercial avenues, Jubilee Hills demands high standards in nutrition and lifestyle. Our home chefs here specialize in healthy, millet-based breakfasts and traditional, oil-free South Indian delicacies. From organic pesarattu batter ground fresh daily to hot, steaming idlis tossed in pure ghee and spicy Guntur karam podi, you get clean eating options that support local micro-entrepreneurs."
      chefIds={["chef_3"]}
    />
  );
}
