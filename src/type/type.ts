export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse {
  statusCode: string;
  message: string;
  success: boolean;
  data: ILoginResponse;
}

export interface ILoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  statusCode: string;
}
