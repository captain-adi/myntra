export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddress {
  fullName: string;
  phone: string;
  zipcode: string;
  address: string;
  city: string;
  state: string;
  _id: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  address?: IAddress[];
}

export interface IProduct {
  availability: string;
  brand: string;
  category: string;
  description: string;
  dimensions: string;
  discountPercentage: number;
  images: string[];
  price: number;
  productId: string;
  quantity: number;
  rating: number;
  reviews: {
    comment: string;
    rating: number;
    _id: string;
    reviewerName: string;
    reviewerEmail: string;
    date: string;
  }[];
  size: string[];
  _id: string;
  warrantyInformation: string;
  title: string;
  slug: string;
  thumbnail: string;
  originalPrice: number;
  tags: string[];
  id: number;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  sku: string;
  stock: number;
  weight: number;
}

// Generic API Response - now you can use it with any data type
export interface IApiResponse<T = any> {
  statusCode: string;
  message: string;
  success: boolean;
  data: T;
}

// Specific response types for different actions
export interface ILoginResponse {
  user: IUser;
  token?: string;
}

// export interface IAddressResponse {
//   user: IUser;
// }

export interface IProductResponse {
  products: IProduct[];
  totalCount?: number;
  page?: number;
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  statusCode: string;
}

export interface IBagItems {
  product: IProduct;
  quantity: number;
  _id: string;
}
export interface IBagItemsResponse {
  productId: string;
  quantity: number;
  _id: string;
}
