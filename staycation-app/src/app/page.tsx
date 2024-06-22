import { getHotels, Hotel } from "@/services/hotelService";

type HotelListProps = {
  hotels: Hotel[];
};

const HotelList = ({ hotels }: HotelListProps) => {
  return hotels.map((hotel) => {
    return (
      <ul>
        <li>
          {hotel.id} - {hotel.name} - {hotel.pictureId} - {hotel.preview} -{" "}
          {hotel.stars}
        </li>
      </ul>
    );
  });
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
      {errorOccured && "An error occured when retrieving the hotel list :("}
    </main>
  );
}
