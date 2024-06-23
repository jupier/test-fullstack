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
              className="rounded"
              alt={hotel.name}
              src={hotel.imageUrl}
            />
            <div className="flex justify-between mt-4">
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
            <div data-testid={`hotel-${hotel.id}-summary`}>{hotel.summary}</div>
            {hotel.availability && (
              <div>
                {hotel.availability.discountPrice} Euros{" "}
                {hotel.availability.originalPrice} Euros -{" "}
                {hotel.availability.discountPercentage} %
              </div>
            )}
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
