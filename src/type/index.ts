export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface ICategory {
  name: string;
  _id: string;
}

export interface IProduct {
  _id: string;
  category_id: ICategory;
  name: string;
  price: number;
  stock: number;
  description: string;
}

export interface IProductForm {
  description: string;
  category_id: string;
  name: string;
  price: number;
  stock: number;
}
export interface IProductCustom extends Omit<IProduct, "category_id"> {
  status: string;
  id: number;
  category: ICategory;
}
export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
}
export interface IOrder {
  _id: string;
  status: string;
  quantity: number;
  productId: IProduct;
  userId: IUser;
}

export interface IOrderForm {
  orderId: string;
  userId: string;
  quantity: number;
}
