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
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  // Add more product fields as needed
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
