import { expect, test } from "vitest";
import { getHotels } from "../services/hotelService";

test("getHotels should return the hotel list", async () => {
  const hotels = await getHotels();
  expect(hotels[0]).toEqual({
    id: 1,
    name: "Hôtel La Lanterne",
    stars: 4,
    summary: "Accès piscine + hammam + vin + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/3c3811c53bccb69bba40424e79c013ca.jpg",
    review: { score: 8.8, count: 6 },
    availability: {
      discountPrice: 170,
      originalPrice: 322,
      discountPercentage: 47,
    },
  });
  expect(hotels[7]).toEqual({
    id: 8,
    name: "Boutet Bastille",
    stars: 5,
    summary: "Accès piscine + sauna-hammam + chocolat chaud + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/868806c118b6c353560063c6c063b8b0.jpg",
    review: { score: 8.6, count: 29 },
    availability: {
      discountPrice: 200,
      originalPrice: 272,
      discountPercentage: 26,
    },
  });
  expect(hotels[9]).toEqual({
    id: 10,
    name: "Hôtel Thoumieux",
    stars: 4,
    summary: "Dîner brasserie + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/5f0c8e189b6a33be3425c44bc48d27ec.jpg",
    review: null,
    availability: null,
  });
  expect(hotels[29]).toEqual({
    id: 30,
    name: "Penthouse du Chat Noir",
    stars: 4,
    summary: "Possibilité 10 amis à dîner + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/13a236d4aac77fe808289c6427557c73.jpg",
    review: null,
    availability: null,
  });
  expect(hotels).toHaveLength(30);
});
