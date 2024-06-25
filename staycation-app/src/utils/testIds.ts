const createDataTestId = (id: number, type: string) => `hotel-${id}-${type}`;

export const createTestIds = (id: number) => ({
  img: createDataTestId(id, "img"),
  summary: createDataTestId(id, "summary"),
  name: createDataTestId(id, "name"),
  review: createDataTestId(id, "review"),
  availability: createDataTestId(id, "availability"),
  stock: createDataTestId(id, "stock"),
  lowestPrice: createDataTestId(id, "lowestPrice"),
});
