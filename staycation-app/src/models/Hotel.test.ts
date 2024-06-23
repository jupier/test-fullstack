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
    minDiscountPrice: 50,
    minPrice: 100,
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
    availability: {
      discountPrice: 50,
      originalPrice: 100,
      discountPercentage: 50,
    },
  });
});

test("createHotelFromHotelRow should create an Hotel with 0 review", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: 0,
    reviewScore: 0,
    preview: "I love this hotel!",
    minDiscountPrice: 50,
    minPrice: 100,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: {
      discountPrice: 50,
      originalPrice: 100,
      discountPercentage: 50,
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
    reviewCount: null,
    reviewScore: null,
    preview: "I love this hotel!",
    minDiscountPrice: 50,
    minPrice: 100,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: {
      discountPrice: 50,
      originalPrice: 100,
      discountPercentage: 50,
    },
    summary: "I love this hotel!",
  });
});

test("createHotelFromHotelRow should create an Hotel with min price = 0", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: null,
    reviewScore: null,
    preview: "I love this hotel!",
    minDiscountPrice: 150,
    minPrice: 0,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: null,
    summary: "I love this hotel!",
  });
});

test("createHotelFromHotelRow should create an Hotel with min discount price = 0", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: null,
    reviewScore: null,
    preview: "I love this hotel!",
    minDiscountPrice: 0,
    minPrice: 150,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: null,
    summary: "I love this hotel!",
  });
});

test("createHotelFromHotelRow should create an Hotel without price", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: null,
    reviewScore: null,
    preview: "I love this hotel!",
    minDiscountPrice: null,
    minPrice: null,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: null,
    summary: "I love this hotel!",
  });
});
