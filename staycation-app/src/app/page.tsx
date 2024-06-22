import { getHotels, Hotel } from "../services/hotelService";

type HotelListProps = {
  hotels: Hotel[];
};

const HotelList = ({ hotels }: HotelListProps) => {
  return (
    <ul>
      {hotels.map((hotel) => {
        return (
          <li key={`${hotel.id}`} data-testid={`hotel-${hotel.id}`}>
            {hotel.id} - {hotel.name} - {hotel.pictureId} - {hotel.preview} -{" "}
            {hotel.stars}
          </li>
        );
      })}
    </ul>
  );
};

export default async function Home() {
  let hotels: Hotel[] = [];
  let errorOccured: boolean = false;
  try {
    hotels = await getHotels();
  } catch (e) {
    errorOccured = true;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!errorOccured && <HotelList hotels={hotels} />}
      {errorOccured && (
        <span data-testid="hotel-error">
          An error occured when retrieving the hotel list :(
        </span>
      )}
    </main>
  );
}
