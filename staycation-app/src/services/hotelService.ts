import DB from "../lib/db";

export interface Hotel {
  id: number;
  name: string;
  stars: number;
  preview: string;
  pictureId: string;
}

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const res = await DB.query<Hotel>(
      `SELECT id, name, stars, preview, picture_id as "pictureId" from hotels order by id asc`
    );
    return res.rows;
  } catch (e) {
    console.info(`An error occured in the hotel service: ${e}}`);
    throw new Error("Unable to retrieve the hotel list.");
  }
};
