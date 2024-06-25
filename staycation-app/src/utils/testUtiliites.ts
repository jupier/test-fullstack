import { expect } from "vitest";
import { screen } from "@testing-library/react";

export const validateHotel = async (
  hotelId: number,
  imgUrl: string,
  preview: string,
  name: string,
  review: string | undefined,
  availability: string | undefined,
  stock: string | undefined,
  lowestPrice: string | undefined
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
  const hotelAvailability = await screen.queryByTestId(
    `hotel-${hotelId}-availability`
  )?.textContent;
  const hotelStock = await screen.queryByTestId(`hotel-${hotelId}-stock`)
    ?.textContent;
  const hotelLowestPrice = await screen.queryByTestId(
    `hotel-${hotelId}-lowestPrice`
  )?.textContent;
  expect(hotelImg).toBe(imgUrl);
  expect(hotelPreview).toBe(preview);
  expect(hotelName).toBe(name);
  expect(hotelReview).toBe(review);
  expect(hotelAvailability).toBe(availability);
  expect(hotelStock).toBe(stock);
  expect(hotelLowestPrice).toBe(lowestPrice);
};
