import { expect, test } from "vitest";
import { createHotelFromHotelRow, Hotel } from "./Hotel";
import { HotelAvailabilityRow, HotelRow } from "@/services/hotelService";

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
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 50,
    minPrice: 100,
    originalStock: 3,
    reservations: 2,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
  const expected: Hotel = {
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
    stock: {
      remaining: 1,
      reservations: 2,
      original: 3,
    },
  };
  expect(hotel).toEqual(expected);
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
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 50,
    minPrice: 100,
    originalStock: 3,
    reservations: 2,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
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
    stock: {
      remaining: 1,
      reservations: 2,
      original: 3,
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
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 50,
    minPrice: 100,
    originalStock: 3,
    reservations: 2,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
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
    stock: {
      remaining: 1,
      reservations: 2,
      original: 3,
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
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 150,
    minPrice: 0,
    originalStock: 3,
    reservations: 2,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: {
      discountPrice: 150,
      originalPrice: 0,
      discountPercentage: 0,
    },
    summary: "I love this hotel!",
    stock: {
      remaining: 1,
      reservations: 2,
      original: 3,
    },
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
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 0,
    minPrice: 150,
    originalStock: 3,
    reservations: 2,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: {
      discountPrice: 0,
      originalPrice: 150,
      discountPercentage: 100,
    },
    summary: "I love this hotel!",
    stock: {
      remaining: 1,
      reservations: 2,
      original: 3,
    },
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
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: null,
    minPrice: null,
    originalStock: 3,
    reservations: 2,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: null,
    summary: "I love this hotel!",
    stock: {
      remaining: 1,
      reservations: 2,
      original: 3,
    },
  });
});

test("createHotelFromHotelRow should create an hotel without availability if the stock is not > 0", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: null,
    reviewScore: null,
    preview: "I love this hotel!",
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 100,
    minPrice: 150,
    originalStock: 3,
    reservations: 3,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: null,
    summary: "I love this hotel!",
    stock: null,
  });
});

test("createHotelFromHotelRow should create an hotel with computed remaining stock", async () => {
  const hotelRow: HotelRow = {
    id: 42,
    name: "Hotel Name",
    pictureId: "https://myimage.com/test",
    stars: 5,
    reviewCount: null,
    reviewScore: null,
    preview: "I love this hotel!",
  };
  const availabilityRow: HotelAvailabilityRow = {
    id: 42,
    minDiscountPrice: 100,
    minPrice: 150,
    originalStock: 12,
    reservations: 8,
  };
  const hotel: Hotel = createHotelFromHotelRow(hotelRow, availabilityRow);
  expect(hotel).toEqual({
    id: 42,
    name: "Hotel Name",
    imageUrl: "https://myimage.com/test",
    stars: 5,
    review: null,
    availability: {
      discountPrice: 100,
      originalPrice: 150,
      discountPercentage: 33,
    },
    summary: "I love this hotel!",
    stock: {
      reservations: 8,
      original: 12,
      remaining: 4,
    },
  });
});
