import { HotelList } from "../components/HotelList";
import { Hotel } from "../models/Hotel";
import { getHotels } from "../services/hotelService";

const ErrorMessage = () => (
  <span data-testid="hotel-error">
    An error occured when retrieving the hotel list :(
  </span>
);

export default async function Home() {
  let hotels: Hotel[] = [];
  let errorOccured: boolean = false;
  try {
    hotels = await getHotels();
  } catch (e) {
    errorOccured = true;
  }
  return (
    <>
      {!errorOccured && <HotelList hotels={hotels} />}
      {errorOccured && <ErrorMessage />}
    </>
  );
}
