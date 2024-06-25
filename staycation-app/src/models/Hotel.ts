import { HotelRow } from "@/services/hotelService";

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

export const createHotelFromHotelRow = (row: HotelRow): Hotel => {
  const stock: Stock | null =
    row.originalStock != null &&
    row.reservations != null &&
    row.originalStock - row.reservations > 0
      ? {
          original: row.originalStock,
          reservations: row.reservations,
          remaining: row.originalStock - row.reservations,
        }
      : null;

  const availability: Availability | null =
    stock && row.minPrice != null && row.minDiscountPrice != null
      ? {
          discountPrice: row.minDiscountPrice,
          originalPrice: row.minPrice,
          discountPercentage: ~~(
            ((row.minPrice - row.minDiscountPrice) * 100) /
            row.minPrice
          ),
        }
      : null;
  return {
    id: row.id,
    name: row.name,
    stars: row.stars,
    summary: row.preview,
    imageUrl: row.pictureId,
    review:
      row.reviewCount && row.reviewScore
        ? { score: row.reviewScore, count: row.reviewCount }
        : null,
    availability,
    stock,
  };
};
