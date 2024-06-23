import { HotelRow } from "@/services/hotelService";

export type Hotel = {
  id: number;
  name: string;
  stars: number;
  summary: string;
  // TODO: imageURL could be an URL object
  imageUrl: string;
  review: { score: number; count: number } | null;
  availability: {
    discountPrice: number;
    originalPrice: number;
    discountPercentage: number;
  } | null;
};

export const createHotelFromHotelRow = (row: HotelRow): Hotel => {
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
    availability:
      row.minPrice && row.minDiscountPrice
        ? {
            discountPrice: row.minDiscountPrice,
            originalPrice: row.minPrice,
            discountPercentage: ~~(
              ((row.minPrice - row.minDiscountPrice) * 100) /
              row.minPrice
            ),
          }
        : null,
  };
};
