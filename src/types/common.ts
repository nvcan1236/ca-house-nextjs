export type ApiResponse<T> = {
  code: number;
  result: T;
  message: string;
};

export interface PageResult<T> {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalElement: number;
  data: T[];
}

export type TokenData = {
  authenticated: boolean;
  token: string;
};
export interface Ward {
  name: string;
}

export interface District {
  name: string;
  wards: Ward[];
}

export interface Province {
  name: string;
  districts: District[]; 
}

export type Image = {
  id: string;
  url: string;
};

export type language = "vi" | "en";
export type role = "motel" | "post";