import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8392,
  responseMimeType: "application/json",
};

export const prompt = `
Create a detailed travel itinerary in a timeline format based on the following details: the source location is {source}, and the destination is {location}. The travelers include {traveler} (which can be For Me, Family, Couple, or Friends). The trip is planned with a decided expenditure of {budget} type, and the travel dates range from {startDate} to {endDate}.

Expenditure type considerations:
If the expenditure type is "Budget", focus on 'affordable choices to save costs.'
If it's "Standard", then 'balance cost and comfort with moderate cost.'
If "Premium", go for 'luxury experiences without compromise and a bigger budget.'
If "All-Inclusive", focus on 'the most exquisite, extravagant, and worry-free vacation where everything is covered.'

The itinerary should cover the number of days of the trip (calculated as the difference between startDate and endDate) and include detailed day-by-day plans for hotels, restaurants, places to visit, and local transportation. Hotels should be chosen based on the number of nights and proximity to other attractions. Similarly, restaurants should be suggested based on their distance from the places to visit, ensuring convenience.

Itinerary format: Provide day-by-day plans for hotels, restaurants, places to visit, and transportation. Structure the itinerary in a timeline format so that each day is organized by time, ensuring visits are optimized for the most beautiful or convenient moments:

Suggest visiting beaches or scenic outdoor locations during sunrise or sunset for stunning views.
Recommend visiting gardens, parks, or areas with beautiful lighting in the late afternoons or evenings.
Suggest historical sites, museums, or indoor attractions in the early morning or late afternoon to avoid crowds or peak heat.
Recommend meal times at restaurants based on proximity to other attractions and ideal times to enjoy the cuisine.

Additional details to include:
3-4 flight options
5-6 hotel options
6-7 must-see attractions with the best times to visit
4-5 restaurant options
1-2 modes of local transportation

Please provide the response in JSON format and ensure the JSON is formatted according to the following schema:
{
  "flights": [
    {
      "airline": "string",
      "flight_number": "string",
      "price": "number",
      "booking_url": "string"
    }
  ],
  "hotels": [
    {
      "name": "string",
      "rating": "number (out of 5)",
      "total_reviews": "number",
      "img_url": "string (actual URL of an HD quality image)",
      "price_per_night": "number",
      "booking_url": "string",
      "geo_coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    }
  ],
  "places_to_visit": [
    {
      "name": "string",
      "description": "string",
      "address": "string",
      "entry_fees": "number (if applicable)",
      "best_times_to_visit": "string",
      "rating": "number (out of 5)",
      "total_reviews": "number"
    }
  ],
  "restaurants": [
    {
      "name": "string",
      "cuisine_type": "string",
      "address": "string",
      "geo_coordinates": {
        "latitude": "number",
        "longitude": "number"
      },
      "rating": "number (out of 5)",
      "total_reviews": "number",
      "average_cost_per_meal": "number",
      "currency": "string",
      "booking_url": "string (if available)"
    }
  ],
  "local_transportation": [
    {
      "mode_of_transportation": "string",
      "currency": "string",
      "price_estimate": "number"
    }
  ],
  "itinerary": [
    {
      "day": "number",
      "date": "string",
      "timeline": [
        {
          "time": "HH:MM",
          "activity": "Visit/Meal/Hotel/Travel",
          "details": "string"
        }
      ]
    }
  ]
}
Ensure that the itinerary optimizes timing, convenience, and proximity between attractions to provide a smooth and enjoyable travel experience tailored to the specified budget and traveler type.
`;

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});
