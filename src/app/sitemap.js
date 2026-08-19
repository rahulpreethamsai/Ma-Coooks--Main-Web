export const dynamic = "force-static";
const baseUrl = "https://ruchirush.netlify.app";
export default function sitemap() {
  const routes = [
    "",
    "/gachibowli-food-delivery",
    "/madhapur-home-cooked-food",
    "/kondapur-local-chefs",
    "/kukatpally-home-food-service",
    "/jubilee-hills-chef-delivery"
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}