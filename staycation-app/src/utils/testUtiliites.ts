import { expect } from "vitest";
import { screen } from "@testing-library/react";

export const validateHotel = async (
  hotelId: number,
  imgUrl: string,
  preview: string,
  name: string,
  review: string | undefined
) => {
  const hotelImg = await screen
    .getByTestId(`hotel-${hotelId}-img`)
    .getAttribute("src");
  const hotelPreview = await screen.getByTestId(`hotel-${hotelId}-summary`)
    .textContent;
  const hotelName = await screen.getByTestId(`hotel-${hotelId}-name`)
    .textContent;
  const hotelReview = await screen.queryByTestId(`hotel-${hotelId}-review`)
    ?.textContent;
  expect(hotelImg).toBe(imgUrl);
  expect(hotelPreview).toBe(preview);
  expect(hotelName).toBe(name);
  expect(hotelReview).toBe(review);
};
