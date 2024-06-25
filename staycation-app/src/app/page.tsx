import { Hotel } from "../models/Hotel";
import { getHotels } from "../services/hotelService";

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
              className="rounded mb-4"
              alt={hotel.name}
              src={hotel.imageUrl}
            />
            <div className="flex justify-between mb-1">
              <div data-testid={`hotel-${hotel.id}-name`} className="font-bold">
                {hotel.name} {[...Array(hotel.stars)].map(() => "*")}
              </div>
              {hotel.review && (
                <div
                  data-testid={`hotel-${hotel.id}-review`}
                  className="text-gray-400"
                >
                  {hotel.review.score} ({hotel.review.count})
                </div>
              )}
            </div>
            <div className="mb-1" data-testid={`hotel-${hotel.id}-summary`}>
              {hotel.summary}
            </div>
            <div className="flex justify-between">
              {hotel.availability && (
                <div data-testid={`hotel-${hotel.id}-availability`}>
                  <span className="font-bold">
                    {hotel.availability.discountPrice}€
                  </span>{" "}
                  <span className="text-gray-400 line-through">
                    {hotel.availability.originalPrice}€
                  </span>{" "}
                  <span className="font-bold bg-[#ff2e63] text-white p-1 rounded">
                    -{hotel.availability.discountPercentage}%
                  </span>
                </div>
              )}
              {hotel.stock && (
                <div
                  data-testid={`hotel-${hotel.id}-stock`}
                  className="font-bold"
                >
                  Only {hotel.stock.remaining} room
                  {hotel.stock.remaining > 1 ? "s" : ""} left on our site!
                </div>
              )}
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
