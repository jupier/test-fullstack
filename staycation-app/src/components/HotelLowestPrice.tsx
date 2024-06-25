import { createTestIds } from "../utils/testIds";

type HotelLowestPriceProps = {
  hotelId: number;
  lowestPrice: number;
};

export const HotelLowestPrice = ({
  hotelId,
  lowestPrice,
}: HotelLowestPriceProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <span data-testid={testIds.lowestPrice} className="text-gray">
      {lowestPrice}€
    </span>
  );
};
