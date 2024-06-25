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
  minDiscountPrice: number | null;
  minPrice: number | null;
  originalStock: number | null;
  reservations: number | null;
};

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const res = await DB.query<HotelRow>(
      `
        SELECT
          hotels.id,
          hotels.name,
          hotels.stars,
          hotels.preview,
          hotels.picture_id as "pictureId",
          AVG(r.score)::numeric(10,1) as "reviewScore",
          COUNT(r.score) as "reviewCount",
          availabilities.discount_price as "minDiscountPrice",
          availabilities.price as "minPrice",
          availabilities.stock as "originalStock",
          availabilities.reservations "reservations"
        FROM hotels
        LEFT JOIN reviews r ON hotels.id = r.hotel_id
        LEFT JOIN (
          SELECT DISTINCT ON (rooms.hotel_id) rooms.hotel_id, 
            openings.discount_price, 
            openings.price, 
            openings.stock,
            (
              SELECT COUNT(*) FROM (
              SELECT DISTINCT ON (b.id) b.id FROM openings o1
              JOIN sale_dates sd on o1.sale_id = sd.id
              JOIN bookings b on o1.room_id = b.room_id AND b.date = ANY(sd.bookable_days)
              WHERE o1.sale_id = (SELECT MAX(id) FROM sale_dates) AND o1.id = openings.id
              ORDER BY b.id, o1.id
              ) as bookings
            ) as reservations
          FROM openings
          JOIN rooms ON rooms.id = openings.room_id
          JOIN sale_dates sd on openings.sale_id = sd.id
          WHERE openings.sale_id = (SELECT MAX(id) FROM sale_dates) AND openings.stock > 0
          GROUP BY rooms.hotel_id, openings.discount_price, openings.price, openings.id
          ORDER BY rooms.hotel_id, openings.discount_price ASC
        ) availabilities ON availabilities.hotel_id = hotels.id
        GROUP BY hotels.id, availabilities.discount_price, availabilities.price, availabilities.stock, availabilities.reservations
        ORDER BY hotels.id ASC;
      `
    );
    return res.rows.map(createHotelFromHotelRow);
  } catch (e) {
    console.info(`An error occured in the hotel service: ${e}}`);
    throw new Error("Unable to retrieve the hotel list.");
  }
};
