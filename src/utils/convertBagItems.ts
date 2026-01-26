import type { IBagItems, IBagItemsResponse, IProduct } from "../type/type";

const convertBagItems = (
  bagItemsResponse: IBagItemsResponse[],
  products: IProduct[],
): IBagItems[] => {
  return bagItemsResponse
    .map((bagItem) => {
      const product = products.find(
        (p: IProduct) => p._id === bagItem.productId,
      );

      if (product) {
        return {
          product: product,
          quantity: bagItem.quantity,
          _id: bagItem._id,
        } as IBagItems;
      }
    })
    .filter((item): item is IBagItems => item !== undefined); // Remove undefined values with type guard
};
export default convertBagItems;
