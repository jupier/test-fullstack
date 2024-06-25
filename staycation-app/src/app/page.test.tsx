import { expect, test, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Page from "./page";
import * as hotelService from "../services/hotelService";
import { validateHotel } from "../utils/testUtiliites";
import { Hotel } from "../models/Hotel";

vi.mock("../services/hotelService");

afterEach(cleanup);

test("Home page should display an hotel", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "https://test.com",
      summary: "summary",
      stars: 2,
      review: {
        count: 2,
        score: 5,
      },
      availability: {
        discountPrice: 200,
        originalPrice: 300,
        discountPercentage: 10,
      },
      stock: {
        original: 5,
        reservations: 3,
        remaining: 2,
      },
      lowestPrice: null,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "https://test.com",
    "summary",
    "name **",
    "5 (2)",
    "200€ 300€ -10%",
    "Only 2 rooms left on our site!",
    undefined
  );
});

test("Home page should display an hotel without review", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "https://test.com",
      summary: "summary",
      stars: 2,
      review: null,
      availability: {
        discountPrice: 200,
        originalPrice: 300,
        discountPercentage: 10,
      },
      stock: {
        original: 5,
        reservations: 3,
        remaining: 2,
      },
      lowestPrice: null,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "https://test.com",
    "summary",
    "name **",
    undefined,
    "200€ 300€ -10%",
    "Only 2 rooms left on our site!",
    undefined
  );
});

test("Home page should display an hotel without availability", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "https://test.com",
      summary: "summary",
      stars: 2,
      review: {
        count: 2,
        score: 5,
      },
      availability: null,
      stock: {
        original: 5,
        reservations: 3,
        remaining: 2,
      },
      lowestPrice: null,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "https://test.com",
    "summary",
    "name **",
    "5 (2)",
    undefined,
    "Only 2 rooms left on our site!",
    undefined
  );
});

test("Home page should display an hotel without stock", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "https://test.com",
      summary: "summary",
      stars: 2,
      review: {
        count: 2,
        score: 5,
      },
      availability: null,
      stock: null,
      lowestPrice: null,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "https://test.com",
    "summary",
    "name **",
    "5 (2)",
    undefined,
    undefined,
    undefined
  );
});

test("Home page should display an hotel with lowest price", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "https://test.com",
      summary: "summary",
      stars: 2,
      review: {
        count: 2,
        score: 5,
      },
      availability: null,
      stock: null,
      lowestPrice: 142,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "https://test.com",
    "summary",
    "name **",
    "5 (2)",
    undefined,
    undefined,
    "142€"
  );
});

test("Home page should display an error message in an error occured when retrieving the hotel list", async () => {
  screen.debug();
  vi.mocked(hotelService.getHotels).mockRejectedValue("error");
  const jsx = await Page();
  render(jsx);
  const hotel = await screen.queryAllByTestId("hotel-1");
  expect(hotel).toBeNull;
  const error = await screen.queryByTestId("hotel-error")?.textContent;
  expect(error).toBe("An error occured when retrieving the hotel list :(");
});
