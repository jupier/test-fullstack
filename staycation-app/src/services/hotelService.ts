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
};

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const res = await DB.query<HotelRow>(
      `SELECT
      hotels.id,
      hotels.name,
      hotels.stars,
      hotels.preview,
      hotels.picture_id as "pictureId",
      AVG(r.score)::numeric(10,1) as "reviewScore",
      COUNT(r.score) as "reviewCount",
      (
          SELECT openings.discount_price
          FROM openings
          JOIN rooms ON rooms.id = openings.room_id
          WHERE rooms.hotel_id = hotels.id 
          AND openings.sale_id = (SELECT MAX(id) FROM sale_dates) 
          AND openings.stock > 0
          ORDER BY openings.discount_price ASC
          LIMIT 1
      ) as "minDiscountPrice",
      (
          SELECT openings.price
          FROM openings
          JOIN rooms ON rooms.id = openings.room_id
          WHERE rooms.hotel_id = hotels.id 
          AND openings.sale_id = (SELECT MAX(id) FROM sale_dates) 
          AND openings.stock > 0
          ORDER BY openings.discount_price ASC
          LIMIT 1
      ) as "minPrice"
      FROM hotels
      LEFT JOIN reviews r ON hotels.id = r.hotel_id
      GROUP BY hotels.id
      ORDER BY hotels.id ASC`
    );
    return res.rows.map(createHotelFromHotelRow);
  } catch (e) {
    console.info(`An error occured in the hotel service: ${e}}`);
    throw new Error("Unable to retrieve the hotel list.");
  }
};
