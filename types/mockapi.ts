type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RequestParams = {
  endpoint: string;
  data?: {[key: string]: string},
  method?: HttpMethod;
}