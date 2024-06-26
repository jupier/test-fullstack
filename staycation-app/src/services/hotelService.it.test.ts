import { expect, test } from "vitest";
import { getHotels } from "../services/hotelService";
import { Hotel } from "../models/Hotel";

test("getHotels should return the hotel list", async () => {
  const expectedIndex0: Hotel = {
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
    stock: {
      original: 3,
      remaining: 2,
      reservations: 1,
    },
    lowestPrice: null,
  };
  const expectedIndex3: Hotel = {
    id: 4,
    name: "Terrass Hotel",
    stars: 4,
    summary:
      "Accès rooftop & terrasse + sauna & hammam privatifs + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/4d56a8c573dd7f614617f9fd55f2b890.jpg",
    review: { score: 9, count: 10 },
    availability: null,
    stock: null,
    lowestPrice: 226,
  };
  const expectedIndex7: Hotel = {
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
    stock: {
      original: 3,
      remaining: 2,
      reservations: 1,
    },
    lowestPrice: null,
  };
  const expectedIndex9: Hotel = {
    id: 10,
    name: "Hôtel Thoumieux",
    stars: 4,
    summary: "Dîner brasserie + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/5f0c8e189b6a33be3425c44bc48d27ec.jpg",
    review: null,
    availability: null,
    stock: null,
    lowestPrice: null,
  };
  const expectedIndex29: Hotel = {
    id: 30,
    name: "Penthouse du Chat Noir",
    stars: 4,
    summary: "Possibilité 10 amis à dîner + petit dej inclus",
    imageUrl:
      "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/13a236d4aac77fe808289c6427557c73.jpg",
    review: null,
    availability: null,
    stock: null,
    lowestPrice: 598,
  };
  const hotels = await getHotels();
  expect(hotels[0]).toEqual(expectedIndex0);
  expect(hotels[3]).toEqual(expectedIndex3);
  expect(hotels[7]).toEqual(expectedIndex7);
  expect(hotels[9]).toEqual(expectedIndex9);
  expect(hotels[29]).toEqual(expectedIndex29);
  expect(hotels).toHaveLength(30);
});
