import { expect } from "vitest";
import { screen } from "@testing-library/react";
import { createTestIds } from "./testIds";

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
  const testIds = createTestIds(hotelId);
  const hotelImg = await screen.getByTestId(testIds.img).getAttribute("src");
  const hotelPreview = await screen.getByTestId(testIds.summary).textContent;
  const hotelName = await screen.getByTestId(testIds.name).textContent;
  const hotelReview = await screen.queryByTestId(testIds.review)?.textContent;
  const hotelAvailability = await screen.queryByTestId(testIds.availability)
    ?.textContent;
  const hotelStock = await screen.queryByTestId(testIds.stock)?.textContent;
  const hotelLowestPrice = await screen.queryByTestId(testIds.lowestPrice)
    ?.textContent;

  expect(hotelImg).toContain(`/_next/image?url=${encodeURIComponent(imgUrl)}`);
  expect(hotelPreview).toBe(preview);
  expect(hotelName).toBe(name);
  expect(hotelReview).toBe(review);
  expect(hotelAvailability).toBe(availability);
  expect(hotelStock).toBe(stock);
  expect(hotelLowestPrice).toBe(lowestPrice);
};
