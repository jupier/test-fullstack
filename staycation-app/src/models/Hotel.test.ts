import { expect, test } from "vitest";
import { createHotelFromHotelRow, Hotel } from "./Hotel";
import { HotelRow } from "@/services/hotelService";

test("createHotelFromHotelRow should create an Hotel with review", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: 42,
    reviewScore: 5.8,
    preview: "I love this hotel!",
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: {
      count: 42,
      score: 5.8,
    },
    summary: "I love this hotel!",
  });
});

test("createHotelFromHotelRow should create an Hotel without review", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: 0,
    reviewScore: 0,
    preview: "I love this hotel!",
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    summary: "I love this hotel!",
  });
});
