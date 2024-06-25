import {
  HotelAvailabilityRow,
  HotelLowestPriceRow,
  HotelRow,
} from "@/services/hotelService";

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

type Review = {
  score: number;
  count: number;
};

export type Hotel = {
  id: number;
  name: string;
  stars: number;
  summary: string;
  // TODO: imageURL could be an URL object
  imageUrl: string;
  review: Review | null;
  availability: Availability | null;
  stock: Stock | null;
  lowestPrice: number | null;
};

const determineLowestPrice = (
  lowestPrices: HotelLowestPriceRow[]
): HotelLowestPriceRow | undefined => {
  return lowestPrices.find(
    (price) => price.originalStock - price.reservations > 0
  );
};

const computeStock = (
  availabilityRow: HotelAvailabilityRow | undefined
): Stock | null => {
  return availabilityRow &&
    availabilityRow.originalStock != null &&
    availabilityRow.reservations != null &&
    availabilityRow.originalStock - availabilityRow.reservations > 0
    ? {
        original: availabilityRow.originalStock,
        reservations: availabilityRow.reservations,
        remaining: availabilityRow.originalStock - availabilityRow.reservations,
      }
    : null;
};
const computeAvailability = (
  availabilityRow: HotelAvailabilityRow | undefined
): Availability | null => {
  return availabilityRow &&
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
};
const computeReview = (hotel: HotelRow): Review | null => {
  return hotel.reviewCount && hotel.reviewScore
    ? { score: hotel.reviewScore, count: hotel.reviewCount }
    : null;
};

export const createHotelFromHotelRow = (
  hotel: HotelRow,
  availabilityRow: HotelAvailabilityRow | undefined,
  lowestPrices: HotelLowestPriceRow[]
): Hotel => {
  const stock: Stock | null = computeStock(availabilityRow);
  const availability: Availability | null =
    stock && computeAvailability(availabilityRow);
  let lowestPrice: number | null = null;
  if (!availability) {
    const res = determineLowestPrice(lowestPrices);
    lowestPrice = res ? res.price : null;
  }
  return {
    id: hotel.id,
    name: hotel.name,
    stars: hotel.stars,
    summary: hotel.preview,
    imageUrl: hotel.pictureId,
    review: computeReview(hotel),
    availability,
    stock,
    lowestPrice,
  };
};
