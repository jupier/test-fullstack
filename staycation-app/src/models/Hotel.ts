import { HotelAvailabilityRow, HotelRow } from "@/services/hotelService";

type Stock = {
  original: number;
  reservations: number;
  remaining: number;
};

type Availability = {
  discountPrice: number;
  originalPrice: number;
  discountPercentage: number;
};

export type Hotel = {
  id: number;
  name: string;
  stars: number;
  summary: string;
  // TODO: imageURL could be an URL object
  imageUrl: string;
  review: { score: number; count: number } | null;
  availability: Availability | null;
  stock: Stock | null;
};

export const createHotelFromHotelRow = (
  hotel: HotelRow,
  availabilityRow: HotelAvailabilityRow | undefined
): Hotel => {
  const stock: Stock | null =
    availabilityRow &&
    availabilityRow.originalStock != null &&
    availabilityRow.reservations != null &&
    availabilityRow.originalStock - availabilityRow.reservations > 0
      ? {
          original: availabilityRow.originalStock,
          reservations: availabilityRow.reservations,
          remaining:
            availabilityRow.originalStock - availabilityRow.reservations,
        }
      : null;

  const availability: Availability | null =
    stock &&
    availabilityRow &&
    availabilityRow.minPrice != null &&
    availabilityRow.minDiscountPrice != null
      ? {
          discountPrice: availabilityRow.minDiscountPrice,
          originalPrice: availabilityRow.minPrice,
          discountPercentage: ~~(
            ((availabilityRow.minPrice - availabilityRow.minDiscountPrice) *
              100) /
            availabilityRow.minPrice
          ),
        }
      : null;
  return {
    id: hotel.id,
    name: hotel.name,
    stars: hotel.stars,
    summary: hotel.preview,
    imageUrl: hotel.pictureId,
    review:
      hotel.reviewCount && hotel.reviewScore
        ? { score: hotel.reviewScore, count: hotel.reviewCount }
        : null,
    availability,
    stock,
  };
};
