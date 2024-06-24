import { expect, test, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Page from "./page";
import * as hotelService from "../services/hotelService";
import { validateHotel } from "../utils/testUtiliites";
import { Hotel } from "../models/Hotel";

vi.mock("../services/hotelService");

afterEach(cleanup);

test("Home page should display mocked hotel", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "picture",
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
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "picture",
    "summary",
    "name **",
    "5 (2)",
    "200€ 300€ -10%"
  );
});

test("Home page should display mocked hotel without review", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "picture",
      summary: "summary",
      stars: 2,
      review: null,
      availability: {
        discountPrice: 200,
        originalPrice: 300,
        discountPercentage: 10,
      },
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    42,
    "picture",
    "summary",
    "name **",
    undefined,
    "200€ 300€ -10%"
  );
});

test("Home page should display mocked hotel without availability", async () => {
  const expectedHotels: Hotel[] = [
    {
      id: 42,
      name: "name",
      imageUrl: "picture",
      summary: "summary",
      stars: 2,
      review: {
        count: 2,
        score: 5,
      },
      availability: null,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  await validateHotel(42, "picture", "summary", "name **", "5 (2)", undefined);
});

test("Home page should display an error", async () => {
  screen.debug();
  vi.mocked(hotelService.getHotels).mockRejectedValue("error");
  const jsx = await Page();
  render(jsx);
  const hotel = await screen.queryAllByTestId("hotel-1");
  expect(hotel).toBeNull;
  const error = await screen.queryByTestId("hotel-error")?.textContent;
  expect(error).toBe("An error occured when retrieving the hotel list :(");
});
