import { createHotelFromHotelRow, Hotel } from "../models/Hotel";
import DB from "../lib/db";

export type HotelRow = {
  id: number;
  name: string;
  stars: number;
  preview: string;
  pictureId: string;
  reviewScore: number;
  reviewCount: number;
};

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const res = await DB.query<HotelRow>(
      `SELECT 
        h.id, 
        h.name, 
        h.stars, 
        h.preview, 
        h.picture_id as "pictureId",
        AVG(r.score)::numeric(10,1) as "reviewScore",
        COUNT(r.score) as "reviewCount"
        from hotels h 
        left join reviews r on h.id = r.hotel_id
        group by h.id
        order by id asc`
    );
    return res.rows.map(createHotelFromHotelRow);
  } catch (e) {
    console.info(`An error occured in the hotel service: ${e}}`);
    throw new Error("Unable to retrieve the hotel list.");
  }
};
