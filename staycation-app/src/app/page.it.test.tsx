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
    "170€ 322€ -47%",
    "Only 2 rooms left on our site!",
    undefined
  );

  await validateHotel(
    4,
    "https://staycation.twic.pics/v1/cover=1000x-/image:pictures/production/4d56a8c573dd7f614617f9fd55f2b890.jpg",
    "Accès rooftop & terrasse + sauna & hammam privatifs + petit dej inclus",
    "Terrass Hotel ****",
    "9 (10)",
    undefined,
    undefined,
    "226€"
  );

  const hotels = await screen.findAllByTestId(/^hotel-.*-img$/i, {
    exact: false,
  });
  expect(hotels).toHaveLength(30);
});
