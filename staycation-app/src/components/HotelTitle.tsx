import { Review } from "../models/Hotel";
import { createTestIds } from "../utils/testIds";

type HotelTitleProps = {
  hotelId: number;
  hotelName: string;
  numberOfStars: number;
  review: Review | null;
};

export const HotelTitle = ({
  hotelId,
  hotelName,
  numberOfStars,
  review,
}: HotelTitleProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <>
      <div data-testid={testIds.name} className="font-bold">
        {hotelName} {[...Array(numberOfStars)].map(() => "*")}
      </div>
      {review && (
        <div data-testid={testIds.review} className="text-gray-400">
          {review.score} ({review.count})
        </div>
      )}
    </>
  );
};
