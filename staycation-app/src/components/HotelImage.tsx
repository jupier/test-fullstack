import { createTestIds } from "../utils/testIds";
import Image from "next/image";

type HotelImageProps = {
  hotelId: number;
  hotelName: string;
  imageUrl: string;
};

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const HotelImage = ({
  hotelId,
  hotelName,
  imageUrl,
}: HotelImageProps) => {
  const testIds = createTestIds(hotelId);
  return (
    <Image
      data-testid={testIds.img}
      loading="lazy"
      className="rounded mb-4"
      alt={hotelName}
      src={imageUrl}
      placeholder="blur"
      blurDataURL={rgbDataURL(210, 210, 210)}
      width={1000}
      height={389}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
};
