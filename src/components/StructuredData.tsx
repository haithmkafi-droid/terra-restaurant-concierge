export function StructuredData() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Terra Restaurant",
    "image": "https://terra-restaurant.com/og-image.jpg",
    "@id": "https://terra-restaurant.com",
    "url": "https://terra-restaurant.com",
    "telephone": "+37400000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Earth Street",
      "addressLocality": "Yerevan",
      "postalCode": "0001",
      "addressCountry": "AM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.1772,
      "longitude": 44.5035
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "12:00",
        "closes": "23:00"
      }
    ],
    "menu": "https://terra-restaurant.com/menu",
    "servesCuisine": ["Modern", "International", "Artisanal"],
    "priceRange": "$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
    />
  );
}
