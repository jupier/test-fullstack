import { createTestIds } from "../utils/testIds";

type HotelImageProps = {
  hotelId: number;
  hotelName: string;
  imageUrl: string;
};

export const HotelImage = ({
  hotelId,
  hotelName,
  imageUrl,
}: HotelImageProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <img
      data-testid={testIds.img}
      loading="lazy"
      className="rounded mb-4"
      alt={hotelName}
      src={imageUrl}
    />
  );
};
