import { HotelImage } from "./HotelImage";
import { Hotel } from "../models/Hotel";
import { HotelAvailability } from "./HotelAvailability";
import { HotelStock } from "./HotelStock";
import { HotelLowestPrice } from "./HotelLowestPrice";
import { HotelTitle } from "./HotelTitle";
import { HotelSummary } from "./HotelSummary";

type HotelListProps = {
  hotels: Hotel[];
};

export const HotelList = ({ hotels }: HotelListProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {hotels.map((hotel) => {
        return (
          <div className="grid-rows-3 mb-10" key={`${hotel.id}`}>
            <HotelImage
              hotelId={hotel.id}
              hotelName={hotel.name}
              imageUrl={hotel.imageUrl}
            />
            <div className="flex justify-between mb-1">
              <HotelTitle
                hotelId={hotel.id}
                hotelName={hotel.name}
                numberOfStars={hotel.stars}
                review={hotel.review}
              />
            </div>
            <HotelSummary hotelId={hotel.id} summary={hotel.summary} />
            <div className="flex justify-between">
              {hotel.availability && (
                <HotelAvailability
                  hotelId={hotel.id}
                  availability={hotel.availability}
                />
              )}
              {hotel.stock && (
                <HotelStock hotelId={hotel.id} stock={hotel.stock} />
              )}
              {hotel.lowestPrice && (
                <HotelLowestPrice
                  hotelId={hotel.id}
                  lowestPrice={hotel.lowestPrice}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
