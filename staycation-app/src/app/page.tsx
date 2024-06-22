import { getHotels, Hotel } from "../services/hotelService";

type HotelListProps = {
  hotels: Hotel[];
};

const HotelList = ({ hotels }: HotelListProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {hotels.map((hotel) => {
        return (
          <div className="grid-rows-3 mb-10" key={`${hotel.id}`}>
            <img
              data-testid={`hotel-${hotel.id}-img`}
              loading="lazy"
              className="rounded"
              alt={hotel.name}
              src={hotel.pictureId}
            />
            <div
              data-testid={`hotel-${hotel.id}-name`}
              className="mt-4 font-bold"
            >
              {hotel.name} {[...Array(hotel.stars)].map(() => "*")}
            </div>
            <div
              data-testid={`hotel-${hotel.id}-preview`}
              className="font-light"
            >
              {hotel.preview}
            </div>
          </div>
        );
      })}
    </div>
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
    <>
      {!errorOccured && <HotelList hotels={hotels} />}
      {errorOccured && (
        <span data-testid="hotel-error">
          An error occured when retrieving the hotel list :(
        </span>
      )}
    </>
  );
}
