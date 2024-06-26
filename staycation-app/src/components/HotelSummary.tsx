import { createTestIds } from "../utils/testIds";

type HotelSummaryProps = {
  hotelId: number;
  summary: string;
};

export const HotelSummary = ({ hotelId, summary }: HotelSummaryProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <div className="mb-1" data-testid={testIds.summary}>
      {summary}
    </div>
  );
};
