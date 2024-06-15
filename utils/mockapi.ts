// import { URL, URLSearchParams } from "url";
import { RequestParams } from "@/types/mockapi";

/** A class for the mockApi */

class MockApi {
  static BASE_URL = "https://665621609f970b3b36c4625e.mockapi.io";

  static async request({ endpoint, data = {}, method = "GET" }: RequestParams) {
    const url = new URL(`${MockApi.BASE_URL}/${endpoint}`);
    const headers = {
      "content-type": "application/json",
    };

    url.search = method === "GET" ? new URLSearchParams(data).toString() : "";

    const body = method !== "GET" ? JSON.stringify(data) : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get all users
   *
   * returns users [{},...]
   *
   * Takes optional parameters:
   *  - username (string)
   *  - page (number)
   *  - limit (number)
   */
  static async getUsers(
    username?: string,
    page: number = 1,
    limit: number = 10
  ) {
    const userData: { [key: string]: string } = {
      page: String(page),
      limit: String(limit),
    };

    if (username) {
      userData.username = username;
    }

    const res = await this.request({
      endpoint: "users",
      data: userData,
    });

    console.log(res);
    return res;
  }
}

export default MockApi;
