import { expect, test, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Page from "./page";
import { validateHotel } from "../utils/testUtiliites";

afterEach(cleanup);

// This is an integration test which does a real DB query
// I'm not really fan of the implementation and should be improved in another PR
test("Home page should display real hotel list", async () => {
  const jsx = await Page();
  render(jsx);
  await validateHotel(
    1,
    "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/3c3811c53bccb69bba40424e79c013ca.jpg",
    "Accès piscine + hammam + vin + petit dej inclus",
    "Hôtel La Lanterne ****",
    "8.8 (6)",
    "170€ 322€ -47%"
  );

  const hotels = await screen.findAllByTestId(/^hotel-.*-img$/i, {
    exact: false,
  });
  expect(hotels).toHaveLength(30);
});
