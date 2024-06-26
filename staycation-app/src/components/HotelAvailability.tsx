import { createTestIds } from "../utils/testIds";
import { Availability } from "../models/Hotel";

type HotelAvailabilityProps = {
  hotelId: number;
  availability: Availability;
};

export const HotelAvailability = ({
  hotelId,
  availability,
}: HotelAvailabilityProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <div data-testid={testIds.availability}>
      <span className="font-bold">{availability.discountPrice}€</span>{" "}
      <span className="text-gray line-through">
        {availability.originalPrice}€
      </span>{" "}
      <span className="font-bold bg-pink text-white p-1 rounded">
        -{availability.discountPercentage}%
      </span>
    </div>
  );
};
