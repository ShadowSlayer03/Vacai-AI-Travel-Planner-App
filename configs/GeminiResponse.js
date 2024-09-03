import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const prompt = `
Create a complete travel itinerary based on the following details: the source location is {source}, and the destination is {location}. The travelers include {traveler} (which can be For Me, Family, Couple, or Friends). The trip is planned with a decided expenditure of {budget} type, and the travel dates range from {startDate} to {endDate}. 
If expenditure type is "Budget," focus on 'affordable choices to save costs.' 
If "Standard" type, then 'Balance cost and comfort with moderate cost.' 
If it is "Premium" type, then go for 'luxury experiences without compromise and a bigger budget.' 
If "All-Inclusive," then go for 'The most exquisite, extravagant, and the best vacation ever where everything is covered, and the traveler will not have to worry about anything.'
There must be atleast 2-3 flights, 4-5 hotels, 3-4 most attractive places to visit, 1-2 activities, and atleast 3-4 restaurants and 1-2 mode of transportation in the response.
Please provide the response in JSON format. Ensure the JSON is formatted according to the following schema.:


{
  "flights": [
    {
      "airline": "string",
      "flight_number": "string",
      "price": "number",
      "booking_url": "string"
    },
    ...
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
    },
    ...
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
    },
    ...
  ],
  "activities": [
    {
      "name": "string",
      "description": "string",
      "price": "number (if applicable)",
      "geo_coordinates": {
        "latitude": "number",
        "longitude": "number"
      },
      "booking_url": "string (if available)"
    },
    ...
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
    },
    ...
  ],
  "local_transportation": [
    {
      "mode_of_transportation": "string",
      "currency": "string",
      "price_estimate": "number"
    },
    ...
  ]
}

Ensure that each section is tailored to the specified budget and traveler type, with all relevant details provided, including geo-coordinates, ratings, and reviews.
`;

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});
