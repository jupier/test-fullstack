import { Stock } from "../models/Hotel";
import { createTestIds } from "../utils/testIds";

type HotelStockProps = {
  hotelId: number;
  stock: Stock;
};

export const HotelStock = ({ hotelId, stock }: HotelStockProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <div data-testid={testIds.stock} className="font-bold">
      Only {stock.remaining} room
      {stock.remaining > 1 ? "s" : ""} left on our site!
    </div>
  );
};
