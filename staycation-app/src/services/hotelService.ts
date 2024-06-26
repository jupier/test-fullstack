import { createHotelFromHotelRow, Hotel } from "../models/Hotel";
import DB from "../lib/db";

export type HotelRow = {
  id: number;
  name: string;
  stars: number;
  preview: string;
  pictureId: string;
  reviewScore: number | null;
  reviewCount: number | null;
};

export type HotelAvailabilityRow = {
  id: number;
  minDiscountPrice: number | null;
  minPrice: number | null;
  originalStock: number | null;
  reservations: number | null;
};

export type HotelLowestPriceRow = {
  saleId: number;
  price: number;
  originalStock: number;
  reservations: number;
};

const fetchHotels = async (): Promise<HotelRow[]> => {
  const res = await DB.query<HotelRow>(
    `
      SELECT
        hotels.id,
        hotels.name,
        hotels.stars,
        hotels.preview,
        hotels.picture_id as "pictureId",
        AVG(r.score)::numeric(10,1) as "reviewScore",
        COUNT(r.score) as "reviewCount"
      FROM hotels
      LEFT JOIN reviews r ON hotels.id = r.hotel_id
      GROUP BY hotels.id
      ORDER BY hotels.id ASC;
    `
  );
  return res.rows;
};

const fetchAvailabilities = async (): Promise<HotelAvailabilityRow[]> => {
  const res = await DB.query<HotelAvailabilityRow>(
    `
    SELECT DISTINCT ON (rooms.hotel_id) rooms.hotel_id as id,
    openings.discount_price as "minDiscountPrice",
    openings.price as "minPrice",
    openings.stock as "originalStock",
    (
      SELECT COUNT(*) FROM (
      SELECT DISTINCT ON (b.id) b.id FROM openings o1
      JOIN sale_dates sd on o1.sale_id = sd.id
      JOIN bookings b on o1.room_id = b.room_id AND b.date = ANY(sd.bookable_days)
      WHERE o1.sale_id = (SELECT MAX(id) from sale_dates) AND o1.id = openings.id
      ORDER BY b.id, o1.id
      ) as bookings
    ) as reservations
    FROM openings
    JOIN rooms ON rooms.id = openings.room_id
    JOIN sale_dates sd on openings.sale_id = sd.id
    WHERE openings.sale_id = (SELECT MAX(id) from sale_dates) AND openings.stock > 0
    GROUP BY rooms.hotel_id, openings.discount_price, openings.price, openings.id
    ORDER BY rooms.hotel_id, openings.discount_price ASC
    `
  );
  return res.rows;
};

const fetchLowestPricesForHotel = async (
  hotelId: number
): Promise<HotelLowestPriceRow[]> => {
  const res = await DB.query<HotelLowestPriceRow>(
    `
    SELECT
    DISTINCT ON (openings.sale_id) openings.sale_id as "saleId",
    openings.price as price,
    openings.stock as "originalStock",
    (
      SELECT COUNT(*) FROM (
      SELECT DISTINCT ON (b.id) b.id FROM openings o1
      JOIN sale_dates sd on o1.sale_id = sd.id
      JOIN bookings b on o1.room_id = b.room_id AND b.date = ANY(sd.bookable_days)
      WHERE o1.sale_id = openings.sale_id AND o1.id = openings.id
      ORDER BY b.id, o1.id
      ) as bookings
    ) as reservations
    FROM openings
    JOIN rooms ON rooms.id = openings.room_id
    JOIN sale_dates sd on openings.sale_id = sd.id
    WHERE rooms.hotel_id = $1 AND openings.sale_id != (SELECT MAX(id) from sale_dates)
    ORDER BY openings.sale_id DESC, openings.price ASC
    `,
    [hotelId]
  );
  return res.rows;
};

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const hotelList = await fetchHotels();
    const hotelAvailabilities = await fetchAvailabilities();
    return Promise.all(
      hotelList.map(async (hotelRow) => {
        const availability = hotelAvailabilities.find(
          (availability) => hotelRow.id == availability.id
        );
        const lowestPrices = await fetchLowestPricesForHotel(hotelRow.id);
        const hotel = createHotelFromHotelRow(
          hotelRow,
          availability,
          lowestPrices
        );
        return hotel;
      })
    );
  } catch (e) {
    console.info(`An error occured in the hotel service: ${e}}`);
    throw new Error("Unable to retrieve the hotel list.");
  }
};
