import { expect, test, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Page from "./page";
import * as hotelService from "../services/hotelService";

vi.mock("../services/hotelService");

afterEach(cleanup);

test("Home page should display mocked hotel list", async () => {
  const expectedHotels: hotelService.Hotel[] = [
    {
      id: 42,
      name: "name",
      pictureId: "picture",
      preview: "preview",
      stars: 2,
    },
  ];
  vi.mocked(hotelService.getHotels).mockResolvedValue(expectedHotels);
  const jsx = await Page();
  render(jsx);
  const hotel = await screen.getByTestId("hotel-42").textContent;
  expect(hotel).toBe("42 - name - picture - preview - 2");
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
