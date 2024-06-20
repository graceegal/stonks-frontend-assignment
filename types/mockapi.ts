type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RequestParams = {
  endpoint: string;
  data?: {};
  method?: HttpMethod;
};

export type User = {
  createdAt: string;
  username: string;
  avatar: string;
  active: boolean;
  fullName: string;
};
