import DB from "../lib/db";

interface User {
  id: number;
  first_name: string;
}

export const getUser = async (): Promise<string> => {
  const res = await DB.query<User>("SELECT * FROM users WHERE id=$1::int", [1]);
  return res.rows[0].first_name;
};
